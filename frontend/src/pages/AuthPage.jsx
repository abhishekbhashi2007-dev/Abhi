import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const onSubmit = async (payload) => {
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup(payload);
      } else {
        await login(payload);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <div className="w-full animate-float space-y-4">
        <AuthForm mode={mode} onSubmit={onSubmit} loading={loading} />
        {error && <p className="rounded-xl border border-rose-700 bg-rose-950/30 p-3 text-sm text-rose-300">{error}</p>}
        <button
          className="w-full text-sm text-slate-300 underline"
          onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))}
        >
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </main>
  );
}
