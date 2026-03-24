import { useState } from 'react';

const initial = { name: '', email: '', password: '' };

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const [form, setForm] = useState(initial);

  const isSignup = mode === 'signup';

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h1 className="text-2xl font-bold">{isSignup ? 'Create account' : 'Welcome back'}</h1>
      {isSignup && (
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
        />
      )}
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-semibold transition hover:bg-indigo-400 disabled:opacity-50"
      >
        {loading ? 'Please wait...' : isSignup ? 'Sign up' : 'Login'}
      </button>
    </form>
  );
}
