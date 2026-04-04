// src/pages/FeedPage.jsx
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard'; // 👈 Use the component we built!
import api from '@/lib/api';
import { Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        setLoading(true);
        // 🚀 Fetch all posts via our smart api.get()
        const data = await api.get('/posts'); 
        
        // Your backend returns { posts: [...] }, handle both formats just in case
        setPosts(data.posts || data);
      } catch (err) {
        setError("Failed to sync with the collective. Check your uplink.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-destructive font-mono italic">
       <p>[ERROR]: {error}</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Live_Uplink
          </span>
          <h2 className="text-4xl font-black text-on-surface tracking-tighter">Main Feed</h2>
          <p className="text-on-surface-variant/40 italic mt-1 font-mono text-sm leading-none">Receiving nodes from the collective_</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-surface-container border border-white/5 flex items-center justify-center text-primary/40 shadow-inner">
           <Zap size={20} />
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center py-32 space-y-4"
            >
               <Loader2 className="animate-spin text-primary/20" size={40} />
               <p className="text-[10px] font-mono text-on-surface-variant/20 uppercase tracking-widest leading-none italic">Syncing_Nodes...</p>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="p-16 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-surface-container/30"
            >
               <p className="text-on-surface-variant/40 italic font-mono text-sm tracking-tight mb-2">Dark_Silence...</p>
               <p className="text-[10px] uppercase font-black text-on-surface-variant/20 tracking-widest">No nodes detected in this sector.</p>
            </motion.div>
          ) : (
            posts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FeedPage;
