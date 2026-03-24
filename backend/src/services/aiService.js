import OpenAI from 'openai';

function detectProjectType(prompt) {
  const text = prompt.toLowerCase();
  if (text.includes('game')) return 'game';
  if (text.includes('website') || text.includes('landing page')) return 'website';
  if (text.includes('mobile') || text.includes('android') || text.includes('ios')) return 'mobile-app';
  if (text.includes('web app') || text.includes('dashboard') || text.includes('saas')) return 'web-app';
  return 'unknown';
}

function needsClarification(prompt) {
  const words = prompt.trim().split(/\s+/);
  return words.length < 4;
}

const systemPrompt = `You are an expert AI software architect.
Return strict JSON with keys:
- explanation: short overview
- projectType: one of mobile-app, web-app, website, game, unknown
- needsClarification: boolean
- clarificationQuestion: string
- files: array of { path, content }
Generate minimal but production-ready starter code, modularized.
If prompt is vague, set needsClarification true and ask one precise question.
Always include a sensible file structure for the requested project.`;

export async function generateProjectFromPrompt({ prompt, apiKey, model }) {
  const typeGuess = detectProjectType(prompt);
  const vague = needsClarification(prompt);

  if (!apiKey) {
    return {
      projectType: typeGuess,
      needsClarification: vague,
      clarificationQuestion: vague
        ? 'Could you specify your target platform and key features?'
        : '',
      explanation:
        'OPENAI_API_KEY is not configured. Returning deterministic scaffold output.',
      files: [
        {
          path: '/src/App.tsx',
          content: `export default function App() {\n  return <div>${prompt}</div>;\n}`,
        },
      ],
    };
  }

  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model,
    input: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `User prompt: ${prompt}\nDetected type: ${typeGuess}` },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'generation_result',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            explanation: { type: 'string' },
            projectType: {
              type: 'string',
              enum: ['mobile-app', 'web-app', 'website', 'game', 'unknown'],
            },
            needsClarification: { type: 'boolean' },
            clarificationQuestion: { type: 'string' },
            files: {
              type: 'array',
              items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  path: { type: 'string' },
                  content: { type: 'string' },
                },
                required: ['path', 'content'],
              },
            },
          },
          required: [
            'explanation',
            'projectType',
            'needsClarification',
            'clarificationQuestion',
            'files',
          ],
        },
      },
    },
  });

  const parsed = JSON.parse(response.output_text);
  return {
    projectType: parsed.projectType || typeGuess,
    needsClarification: Boolean(parsed.needsClarification),
    clarificationQuestion: parsed.clarificationQuestion || '',
    explanation: parsed.explanation,
    files: parsed.files || [],
  };
}
