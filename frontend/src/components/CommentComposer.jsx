import { useState } from "react";
import api from "@/lib/api";

function CommentComposer({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      // 📡 Transmit the new signal to the collective
      const newComment = await api.post(`/posts/${postId}/comments`, { content });
      
      setContent(""); // 🧹 Clear the input
      onCommentAdded(newComment); // 🚀 Update the UI instantly
    } catch (err) {
      alert("Failed to synchronize comment: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-6 bg-surface-container/50 border border-white/5 rounded-[2rem] shadow-inner mb-8 items-center">
      <div className="flex-1">
        <textarea
          required
          rows={1}
          placeholder="Inject your thoughts into this node..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent border-none text-on-surface text-sm focus:ring-0 placeholder:text-on-surface-variant/20 resize-none h-auto min-h-[44px] flex items-center"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading || !content.trim()}
        className="px-6 py-2 bg-primary text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 h-10"
      >
        {loading ? "TRANSMITTING..." : "SIGNAL"}
      </button>
    </form>
  );
}

export default CommentComposer;
