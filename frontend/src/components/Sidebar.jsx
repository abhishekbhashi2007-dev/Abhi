export default function Sidebar({ user, quota, onLogout }) {
  return (
    <aside className="flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">All in 1</p>
        <h2 className="text-xl font-bold">AI Builder</h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Signed in as</p>
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-slate-300">{user?.email}</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Daily usage</p>
        <p className="text-lg font-semibold">
          {quota.used}/{quota.limit}
        </p>
        <p className="text-sm text-slate-300">{quota.remaining} requests left today</p>
      </div>

      <button
        onClick={onLogout}
        className="mt-auto rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
      >
        Logout
      </button>
    </aside>
  );
}
