import { Search, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import TagBadge from './TagBadge';

const TrendingNode = ({ name, posts }) => (
  <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono text-xs">
        <TrendingUp size={14} />
      </div>
      <div>
        <p className="text-sm font-bold text-on-surface">#{name}</p>
        <p className="text-[10px] text-on-surface-variant/60">{posts} nodes today</p>
      </div>
    </div>
    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">→</span>
  </div>
);

const UserSuggestion = ({ name, role }) => (
  <div className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface font-bold text-xs shrink-0 border border-white/5 uppercase">
        {name[0]}
      </div>
      <div className="overflow-hidden">
        <p className="text-sm font-bold text-on-surface truncate">{name}</p>
        <p className="text-[10px] text-on-surface-variant/60 truncate italic">{role}</p>
      </div>
    </div>
    <Button variant="outline" size="xs" className="h-7 text-[10px] border-primary/20 text-primary hover:bg-primary/10 hover:text-primary">
      FOLLOW
    </Button>
  </div>
);

function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky right-0 top-0 p-6 space-y-8 border-l border-white/5 bg-surface/50 overflow-y-auto">
      
      {/* 🔍 Search Input (Minimalist) */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search collective..."
          className="w-full bg-surface-container border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-on-surface placeholder:text-on-surface-variant/30"
        />
      </div>

      {/* 🔥 Trending Section */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
          Trending_Nodes
        </h3>
        <div className="space-y-1">
          <TrendingNode name="nextjs_15" posts="1.2k" />
          <TrendingNode name="rust_wasm" posts="842" />
          <TrendingNode name="tailwind_v4" posts="612" />
        </div>
      </section>

      {/* 👥Suggested Connections */}
      <section className="space-y-4">
        <h3 className="text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.2em] px-2">
          Promising_devs
        </h3>
        <div className="space-y-1">
          <UserSuggestion name="Isaias_Dev" role="Core Engineer" />
          <UserSuggestion name="Sacha_W" role="UI Scientist" />
          <UserSuggestion name="Hassan_M" role="Backend Overlord" />
        </div>
      </section>

      {/* 🧾 Simple Footer Links */}
      <div className="px-3 pt-4 text-[10px] text-on-surface-variant/30 font-mono space-x-3">
        <a href="#" className="hover:text-primary transition-colors">v2.0.4</a>
        <span>•</span>
        <a href="#" className="hover:text-primary transition-colors">Privacy_Protocol</a>
      </div>

    </aside>
  );
}

export default RightSidebar;
