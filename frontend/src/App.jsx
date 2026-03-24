import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <DashboardPage /> : <AuthPage />;
}
