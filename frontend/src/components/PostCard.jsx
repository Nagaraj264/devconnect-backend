import TagBadge from "./TagBadge";
import { useState } from "react";

function PostCard({ author, title, content, tags, likes, comments }) {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    if (isLiked) {
      setLikeCount(likeCount - 1); // Unlike: decrease count
      setIsLiked(false); // Mark as not liked
    } else {
      setLikeCount(likeCount + 1); // Like: increase count
      setIsLiked(true); // Mark as liked
    }
  }

  return (
    <article className="bg-surface-container rounded-xl p-6 border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        {/* A colored circle a a placeholder avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
          {author[0]}
        </div>
        <div>
          <h3 className="font-bold text-on-surface">{author}</h3>
          <p className="text-xs text-on-surface-variant">2h ago</p>
        </div>
      </div>

      {/* BODY: Title + Content */}
      <h2 className="text-lg font-bold text-on-surface mb-2">{title}</h2>
      <p className="text-on-surface-variant text-sm mb-4">{content}</p>

      {/* TAGS: Map over the array to render TagBadges */}
      <div className="flex gap-2 mb-4">
        {tags.map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
      </div>

      {/* FOOTER: Like + Comment counts */}
      <div className="flex gap-6 pt-4 border-t border-white/5 text-on-surface-variant text-sm">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            isLiked
              ? "text-red-500"
              : "text-on-surface-variant hover:text-red-500"
          }`}
        >
          {isLiked ? "❤️" : "🤍"} {likeCount}
        </button>
        <span>💬 {comments}</span>
      </div>
    </article>
  );
}

export default PostCard;
