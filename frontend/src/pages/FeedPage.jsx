// src/pages/FeedPage.jsx
import PostCard from '../components/PostCard';

const FeedPage = () => (
  <div className="space-y-6">
    <header className="mb-8">
      <div className="flex items-center gap-2 mb-2">
         <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
         <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Live Transmission</span>
      </div>
      <h1 className="text-3xl font-black text-on-surface tracking-tight">Main Feed</h1>
      <p className="text-on-surface-variant italic">Connecting the collective...</p>
    </header>

    <div className="max-w-2xl space-y-6">
        <PostCard
          author="Sara Jenkins"
          title="Implementing Type-Safe Middleware in Next.js 14"
          content="Finally cracked the pattern for end-to-end type safety in the middleware layer."
          tags={["React", "Prisma", "TypeScript"]}
          likes={120} comments={48}
        />
        <PostCard
          author="Marcus Thorne"
          title="The Future of AI-Assisted Architecture"
          content="We're moving into an era where LLMs won't just suggest functions, but will actively refactor entire system designs."
          tags={["AI", "Architecture"]}
          likes={856}
          comments={112}
        />
    </div>
  </div>
);

export default FeedPage;
