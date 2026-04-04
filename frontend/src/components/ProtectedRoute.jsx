import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // 👈 Tuned in to our Auth Radio station

  // 1. If the app is still checking the token, show a loading screen
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // 2. If no user is logged in, kick them out to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If everything is fine, show the page!
  return <Outlet />;
};

export default ProtectedRoute;
