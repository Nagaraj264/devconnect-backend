import { useState } from 'react'    
import TagBadge from './components/TagBadge'
import PostCard from './components/PostCard'

function App() {
  return (
    <div className="bg-surface min-h-screen p-8">
      <h1 className="text-on-surface text-2xl font-bold mb-6">DevConnect Feed</h1>
      <div className="max-w-2xl space-y-6">
        <PostCard
          author="Sara Jenkins"
          title="Implementing Type-Safe Middleware in Next.js 14"
          content="Finally cracked the pattern for end-to-end type safety in the middleware layer."
          tags={["React", "Prisma", "TypeScript"]}
          likes={120}
          comments={48}
        />
        <PostCard
          author="Marcus Thorne"
          title="The Future of AI-Assisted Architecture"
          content="We're moving into an era where LLMs won't just suggest functions, but will actively refactor entire system designs."
          tags={["AI", "Architecture"]}
          likes={856}
          comments={112}
        />
        <PostCard
          author="Alex Rivera"
          title="Why I Switched from REST to GraphQL"
          content="After 3 years of building REST APIs, here's what convinced me to make the jump."
          tags={["GraphQL", "Backend"]}
          likes={234}
          comments={67}
        />
      </div>
    </div>
  )
}
export default App
