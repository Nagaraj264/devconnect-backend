// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // 👈 1. Import Auth Context
import api from '@/lib/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 2. Access the login trigger 📻

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 🚀 3. Note: Make sure your api.js BASE_URL includes /auth 
      // or use '/auth/login' here!
      const data = await api.post('/auth/login', { email, password });
      
      // ✅ 4. Tell the App we are logged in!
      // Your backend returns { accessToken, refreshToken, user } 
      // (Check if 'user' is part of yours, if not, we'll fetch it in Step 3.3)
      login(data.accessToken, data.user); 
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Check your node connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter">Initialize Session</h2>
        <p className="text-on-surface-variant/60 text-lg">Enter your credentials to access the network.</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex items-center gap-3 animate-shake">
          <AlertCircle size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Identifier (Email)</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="node@devconnect.io"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-mono"
          />
        </div>

        <div className="space-y-2 group">
           <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Access Token (Password)</label>
           <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit"
            disabled={loading}
            size="lg" 
            className="w-full py-7 text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-all shadow-xl shadow-primary/10 hover:shadow-primary/30 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin text-black" size={24} />
            ) : (
              <>
                Authenticate
                <LogIn size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="text-center pt-2">
        <p className="text-on-surface-variant/50 text-sm">
          New terminal user? <Link to="/signup" className="text-primary hover:underline font-bold underline-offset-4">Register Protocol</Link>
        </p>
      </div>

    </div>
  );
}

export default LoginPage;
