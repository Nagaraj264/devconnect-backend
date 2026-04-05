// src/components/PostCard.jsx
import TagBadge from "./TagBadge";
import { useState } from "react";
import { Heart, MessageSquare, Share2, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import api from "@/lib/api";
import { Link } from 'react-router-dom';


function PostCard({ post, onCommentClick }) {
  const {
    author,
    title,
    content,
    tags = [],
    _count,
    createdAt,
    imageUrl,
  } = post || {};

  const [likeCount, setLikeCount] = useState(_count?.likes || 0);
  const [isLiked, setIsLiked] = useState(post.likes?.length > 0);

  async function handleLike() {
    try {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      await api.post(`/likes/${post.id}?type=post`);
    } catch (error) {
      setIsLiked(isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      alert("Transmission failed. Re-syncing...");
    }
  }

  // 🆔 Get initials for avatar (e.g. "Rajesh" -> "R")
  const initials =
    author?.name?.charAt(0) || author?.username?.charAt(0) || "?";

  return (
    <article className="bg-surface-container/50 rounded-[2rem] p-8 border border-white/5 hover:border-primary/20 transition-all group shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* 👤 High-Tech Avatar */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary font-black border border-primary/20 shadow-lg group-hover:scale-105 transition-transform uppercase">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-on-surface leading-none mb-1 group-hover:text-primary transition-colors">
              {author?.name || "Anonymous Node"}
            </h3>
            <p className="text-[10px] font-mono text-on-surface-variant/40 uppercase tracking-widest leading-none">
              @{author?.username || "identity_hidden"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant/30 uppercase tracking-tighter">
          <Clock size={12} />
          <span>{formatTime(createdAt)}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <Link to={`/posts/${post.id}`}>
        <h2 className="text-2xl font-black text-on-surface tracking-tight leading-tight">
          {title}
        </h2>
        </Link>
        <p className="text-on-surface-variant/70 text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </p>

        {/* 📸 Visual Attachment (if exists) */}
        {imageUrl && (
          <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
      </div>

      {/* 🏷️ Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <TagBadge key={tag.id || tag.name} label={tag.name || tag} />
        ))}
      </div>

      {/* 📊 Interaction Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5 text-on-surface-variant/50">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isLiked
                ? "bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                : "bg-surface/50 hover:bg-surface hover:text-red-500"
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <span className="text-xs font-black">{likeCount}</span>
          </button>

          <button 
            onClick={onCommentClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/50 hover:bg-surface hover:text-primary transition-all"
          >
            <MessageSquare size={18} />
            <span className="text-xs font-black">{_count?.comments || 0}</span>
          </button>
        </div>

        <button className="p-2 rounded-xl bg-surface/50 hover:bg-surface transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </article>
  );
}

export default PostCard;
