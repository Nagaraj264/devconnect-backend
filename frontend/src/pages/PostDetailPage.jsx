import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import PostCard from "../components/PostCard";
import { Loader2 } from "lucide-react";
import CommentCard from "../components/CommentCard";
import CommentComposer from "../components/CommentComposer";

function PostDetailPage() {
  const { postId } = useParams(); // 🆔 Get the ID from the URL!
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        // 📡 Fetch the single node from the collective
        const data = await api.get(`/posts/${postId}`);
        setPost(data);
      } catch (err) {
        setError("This post does not exist or signal was lost.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleAddComment = (newComment) => {
    setPost((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-20 italic">
        <Loader2 className="animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest font-mono">
          Syncing_Post_Data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-destructive font-mono italic">
        [ERROR]: {error}
      </div>
    );

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PostCard 
        post={post} 
        onCommentClick={() => setIsReplying(!isReplying)}
      />
      
      {isReplying && (
        <CommentComposer 
          postId={postId} 
          onCommentAdded={(newComment) => {
            handleAddComment(newComment);
            setIsReplying(false);
          }} 
        />
      )}

      {/* 📋 Comments Sector */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-black text-on-surface-variant/30 uppercase tracking-[0.3em] font-mono">
            Incoming_Signals [{post.comments?.length || 0}]
          </h3>
          <div className="h-[1px] flex-1 bg-white/5 mx-6"></div>
        </div>
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic font-mono text-xs">
            Silence_Detected. No signals received for this node.
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetailPage;
