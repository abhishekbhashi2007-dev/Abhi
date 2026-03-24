export default function OutputPanel({ generation }) {
  if (!generation) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-slate-400">
        Your generated project output will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div>
        <h3 className="text-lg font-semibold">Project Output</h3>
        <p className="text-sm text-slate-300">Type: {generation.projectType}</p>
      </div>

      <p className="text-slate-200">{generation.explanation}</p>

      {generation.needsClarification && (
        <div className="rounded-xl border border-amber-700 bg-amber-950/40 p-3 text-amber-200">
          Clarification needed: {generation.clarificationQuestion}
        </div>
      )}

      <div className="space-y-3">
        {generation.files?.map((file) => (
          <div key={file.path} className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
            <p className="mb-2 font-mono text-sm text-indigo-300">{file.path}</p>
            <pre className="code-scroll overflow-x-auto text-xs text-slate-200">
              <code>{file.content}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
