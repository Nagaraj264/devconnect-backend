import { formatTime } from "@/lib/utils";

function CommentCard({ comment }) {
  const { author, content, createdAt } = comment;
  const initials = author?.name?.charAt(0) || "?";

  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-surface-container/30 border border-white/5 animate-in fade-in duration-300">
      {/* 👤 Mini Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/5 uppercase shrink-0">
        {initials}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-on-surface">
            {author?.name || "Anonymous Node"}
          </p>
          <span className="text-[10px] font-mono text-on-surface-variant/30 uppercase italic">
            {formatTime(createdAt)}
          </span>
        </div>
        <p className="text-sm text-on-surface-variant/80 leading-relaxed font-sans">{content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
