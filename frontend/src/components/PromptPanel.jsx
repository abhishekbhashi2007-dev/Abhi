import { useState } from 'react';

export default function PromptPanel({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('Build a modern todo app with login and dark mode');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setError('');
    onGenerate(prompt.trim());
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h3 className="text-lg font-semibold">Prompt Input</h3>
      <textarea
        rows={5}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe the app, game, or website you want to generate..."
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
      />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-500 px-5 py-2 font-semibold transition hover:bg-indigo-400 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Project'}
      </button>
    </form>
  );
}
