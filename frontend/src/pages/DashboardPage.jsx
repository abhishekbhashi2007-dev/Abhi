import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import PromptPanel from '../components/PromptPanel';
import OutputPanel from '../components/OutputPanel';
import HistoryPanel from '../components/HistoryPanel';

export default function DashboardPage() {
  const { token, user, logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quota, setQuota] = useState({ used: 0, remaining: 10, limit: 10 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    const data = await apiRequest('/generate/history', { token });
    setHistory(data.items);
    setQuota(data.quota);
  };

  useEffect(() => {
    loadHistory().catch((err) => setError(err.message));
  }, []);

  const generate = async (prompt) => {
    setError('');
    setLoading(true);
    try {
      const result = await apiRequest('/generate', {
        method: 'POST',
        token,
        body: { prompt },
      });
      setSelected(result);
      setQuota(result.quota);
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-[280px_1fr]">
        <Sidebar user={user} quota={quota} onLogout={logout} />

        <section className="space-y-4">
          {error && <p className="rounded-xl border border-rose-700 bg-rose-950/30 p-3 text-sm text-rose-300">{error}</p>}

          <PromptPanel onGenerate={generate} loading={loading} />

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <OutputPanel generation={selected} />
            <HistoryPanel items={history} onSelect={setSelected} />
          </div>
        </section>
      </div>
    </main>
  );
}
