import { Link, useLocation } from "react-router-dom";
import {
  Terminal,
  LayoutGrid,
  Search,
  MessageSquare,
  Bell,
  User,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import CreatePostModal from "./CreatePostModal";

const SidebarItem = ({ icon: Icon, label, path, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`mx-3 flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-on-surface-variant/70 hover:bg-surface-container hover:text-primary"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-[-12px] w-1 h-6 bg-primary rounded-full transition-all"
        />
      )}
      <Icon
        size={20}
        className="opacity-80 group-hover:scale-110 transition-transform"
      />
      <span className="font-medium text-sm tracking-tight">{label}</span>
      {badge && (
        <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-primary/20">
          {badge}
        </span>
      )}
    </Link>
  );
};

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky left-0 top-0 bg-surface-container border-r border-white/5 z-40">
      {/* 🚀 Logo Section */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Terminal
            size={24}
            className="text-on-primary-container stroke-[3]"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-on-surface leading-none">
            DevConnect
          </h1>
          <span className="text-[10px] text-primary/50 font-mono font-bold tracking-widest uppercase">
            Nodes_v2.0
          </span>
        </div>
      </div>

      {/* 🧭 Navigation */}
      <nav className="flex-1 space-y-1">
        <SidebarItem icon={LayoutGrid} label="Feed" path="/" />
        <SidebarItem icon={Search} label="Explore" path="/explore" />
        <SidebarItem
          icon={MessageSquare}
          label="Messages"
          path="/chat"
          badge="New"
        />
        <SidebarItem
          icon={Bell}
          label="Notifications"
          path="/notifications"
          badge="3"
        />
        <SidebarItem icon={User} label="Profile" path="/profile" />
      </nav>

      {/* 👤 Action & Account Section */}
      <div className="p-4 mt-auto space-y-4">
        <CreatePostModal>
          <Button
            size="lg"
            className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-black font-bold rounded-2xl shadow-xl shadow-primary/10 hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group border-none"
          >
            <PlusCircle
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span>CREATE POST</span>
          </Button>
        </CreatePostModal>

        {/* 🆔 User Profile Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container border border-white/5 mx-1 shadow-inner group/profile">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border border-primary/10 uppercase shrink-0">
            {user?.name?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-on-surface truncate leading-none mb-1">
              {user?.name || "Guest Node"}
            </p>
            <p className="text-[9px] text-on-surface-variant/40 font-mono italic truncate">
              @{user?.username || "anonymous"}
            </p>
          </div>
          <button
            onClick={logout}
            className="p-2 hover:bg-destructive/10 text-on-surface-variant/30 hover:text-destructive transition-colors rounded-lg"
            title="Log Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
