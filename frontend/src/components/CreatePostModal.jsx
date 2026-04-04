// src/components/CreatePostModal.jsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  Send,
  Hash,
  Type,
  Layout,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 1. Added motion!
import api from "@/lib/api";

function CreatePostModal({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "DISCUSSION",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🏗️ 2. Build the Signal "Envelope"
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('type', formData.type);
      
      const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
      tagsArray.forEach(tag => data.append('tags[]', tag)); 

      if (image) {
        data.append('image', image);
      }

      // 📡 3. Transmit to network
      await api.post("/posts", data);

      // 4. Success Reset
      setFormData({ title: "", content: "", type: "DISCUSSION", tags: "" });
      setImage(null);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      alert("Failed to broadcast signal: " + err.message);
      setLoading(false); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !loading && setOpen(val)}> {/* 🔒 Lock modal when loading */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="sm:max-w-[550px] bg-surface-container border-white/5 text-on-surface rounded-3xl p-8 max-h-[90vh] overflow-y-auto overflow-hidden">
        
        {/* 🎬 5. PROGRESS LINE (Only visible when loading) */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-50 shadow-[0_0_15px_rgba(var(--primary),0.8)]"
            />
          )}
        </AnimatePresence>

        <DialogHeader>
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Terminal size={20} />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tighter uppercase">
              Initialize_Node
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className={`space-y-5 mt-6 transition-all duration-700 ${loading ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100 blur-0'}`}>
          {/* Node Title */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1 flex items-center gap-2 group-focus-within:text-primary transition-colors italic leading-none">
              <Type size={12} /> Node_Title
            </label>
            <input
              required
              disabled={loading}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Signal subject (min 5 chars)..."
              className="w-full bg-surface/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-on-surface-variant/20"
            />
          </div>

          <div className="flex gap-4">
            {/* Protocol Type */}
            <div className="flex-1 space-y-2 group">
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1 flex items-center gap-2 group-focus-within:text-primary transition-colors italic leading-none">
                <Layout size={12} /> Type
              </label>
              <select
                disabled={loading}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-surface/50 border border-white/5 rounded-xl py-4 px-5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
              >
                <option value="DISCUSSION">DISCUSSION</option>
                <option value="QUESTION">QUESTION</option>
                <option value="RESOURCE">RESOURCE</option>
              </select>
            </div>

            {/* Visual Attachment */}
            <div className="flex-1 space-y-2 group">
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1 flex items-center gap-2 group-focus-within:text-primary italic leading-none">
                <ImageIcon size={12} /> Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading}
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 px-5 text-sm text-[10px] text-on-surface file:hidden cursor-pointer"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-20">
                  <span className="text-[10px] uppercase font-black">{image ? 'READY' : 'EMPTY'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1 flex items-center gap-2 group-focus-within:text-primary transition-colors italic leading-none">
              Transmission_Payload
            </label>
            <textarea
              required
              disabled={loading}
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Inject knowledge into the network..."
              className="w-full bg-surface/50 border border-white/5 rounded-2xl p-5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-on-surface-variant/20 h-32"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-widest px-1 flex items-center gap-2 group-focus-within:text-primary transition-colors italic leading-none">
              <Hash size={12} /> Sync_Tags
            </label>
            <input
              disabled={loading}
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="codes, react, node..."
              className="w-full bg-surface/50 border border-white/5 rounded-xl py-3 px-5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono italic placeholder:text-on-surface-variant/20"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || formData.title.length < 5 || formData.content.length < 10}
            className="w-full py-8 text-black font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20 group h-auto"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <Loader2 className="animate-spin" size={20} />
                Transmitting_Signal_Phase[1]...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Launch_Node <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostModal;
