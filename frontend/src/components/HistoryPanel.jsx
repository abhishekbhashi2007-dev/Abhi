export default function HistoryPanel({ items, onSelect }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h3 className="mb-3 text-lg font-semibold">History</h3>
      <div className="space-y-2">
        {items.length === 0 && <p className="text-sm text-slate-400">No previous generations yet.</p>}
        {items.map((item) => (
          <button
            key={item._id}
            onClick={() => onSelect(item)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-left transition hover:border-indigo-400"
          >
            <p className="truncate text-sm font-semibold">{item.prompt}</p>
            <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
