// src/pages/SignupPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus, Loader2, AlertCircle, Database } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Call the register API
      const data = await api.post('/auth/register', formData);
      
      // 2. Many backends auto-login after signup, or you can redirect to login.
      // Your backend returns { message, user }, so let's redirect to login for now
      // so they can enter their fresh credentials!
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signal lost during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter">Register New Node</h2>
        <p className="text-on-surface-variant/60">Create your identity to join the collective.</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex items-center gap-3">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary">Human Name</label>
          <input name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-mono" />
        </div>

        {/* Username */}
        <div className="space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary">Node Handle</label>
          <input name="username" required value={formData.username} onChange={handleChange} placeholder="@dev_handle"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-mono italic" />
        </div>

        {/* Email - Full Width */}
        <div className="md:col-span-2 space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary">Protocol Email</label>
          <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="node@protocol.io"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all font-mono" />
        </div>

        {/* Password - Full Width */}
        <div className="md:col-span-2 space-y-2 group">
          <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary">Access Token (Password)</label>
          <input name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="••••••••"
            className="w-full bg-surface-container/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>

        <div className="md:col-span-2 pt-4">
          <Button type="submit" disabled={loading} size="lg" 
            className="w-full py-7 text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-all shadow-xl shadow-primary/10 group">
            {loading ? <Loader2 className="animate-spin" /> : <>Register Protocol <UserPlus size={18} className="ml-2" /></>}
          </Button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-on-surface-variant/50 text-sm">
          Already verified? <Link to="/login" className="text-primary hover:underline font-bold underline-offset-4">Signal Login</Link>
        </p>
      </div>

    </div>
  );
}

export default SignupPage;
