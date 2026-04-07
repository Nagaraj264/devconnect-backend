import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import PostCard from "../components/PostCard";
import { Loader2, MapPin, Code, MessageSquare, Activity, UserPlus, ImagePlus, PlusCircle, Camera } from "lucide-react";
import TagBadge from "../components/TagBadge";
import { useAuth } from "@/context/AuthContext";
import EditProfileModal from "../components/EditProfileModal";

// 🌍 Dynamic URL for images based on the backend API address
const SERVER_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const getAvatarUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  // Ensure no double slashes when joining
  const cleanPath = path.replace(/\\/g, "/").replace(/^\/+/, ""); 
  return `${SERVER_URL}/${cleanPath}`;
};

// 🐙 Custom SVG Icons to bypass library errors
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

function ProfilePage() {
  const { user: currentUser } = useAuth(); // 🔐 Get the logged-in user
  const { username } = useParams(); // 🆔 Get the dynamic username from the URL
  const [profile, setProfile] = useState(null);

  // 🔍 Check if viewing "my" profile
  const isMyProfile = currentUser?.username === username;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // 📡 Fetch the user's profile info from the backend
        const data = await api.get(`/users/${username}`);
        setProfile(data);
      } catch (err) {
        setError("Developer not found in the matrix.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 opacity-20 italic">
      <Loader2 className="animate-spin mb-4" />
      <p className="text-xs uppercase tracking-widest font-mono">Scanning_Neural_Profile...</p>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center font-mono text-destructive italic">
      [ERROR]: {error}
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🚀 High-Tech Profile Card */}
      <div className="relative group overflow-hidden bg-surface-container/40 rounded-[2.5rem] border border-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {/* Background Accent Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-primary/10 transition-all duration-1000"></div>

        <div className="flex flex-col md:flex-row gap-10 relative z-10">
          {/* Left: Avatar with Initials */}
          <div className="shrink-0 flex flex-col items-center gap-4">
            {isMyProfile ? (
              <EditProfileModal profile={profile} onUpdate={(updated) => setProfile({...profile, ...updated})}>
                <div className="relative group cursor-pointer animate-in zoom-in duration-500">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary text-5xl font-black border border-primary/20 shadow-lg group-hover:scale-105 transition-all overflow-hidden uppercase">
                    {profile.avatarUrl ? (
                      <img src={getAvatarUrl(profile.avatarUrl)} className="w-full h-full object-cover" />
                    ) : (
                      profile.name?.charAt(0) || profile.username?.charAt(0)
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]">
                    <Camera className="text-white" />
                  </div>
                </div>
              </EditProfileModal>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary text-5xl font-black border border-primary/20 uppercase">
                {profile.avatarUrl ? (
                  <img src={getAvatarUrl(profile.avatarUrl)} className="w-full h-full object-cover rounded-[2rem]" />
                ) : (
                  profile.name?.charAt(0) || profile.username?.charAt(0)
                )}
              </div>
            )}
            {/* Minimal Stats */}
            <div className="flex gap-4 text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-40">
              <div className="text-center">
                <p className="font-black text-primary">{profile._count?.posts || 0}</p>
                <p>Signals</p>
              </div>
              <div className="h-6 w-[1px] bg-white/10"></div>
              <div className="text-center">
                <p className="font-black text-primary">{profile._count?.comments || 0}</p>
                <p>Echoes</p>
              </div>
            </div>
          </div>

          {/* Right: Info Cluster */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <h1 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter">
                  {profile.name || "Anonymous Node"}
                </h1>
                
                {isMyProfile && (
                  <EditProfileModal profile={profile} onUpdate={(updated) => setProfile({...profile, ...updated})}>
                    <button className="px-4 py-1.5 bg-primary/10 text-primary rounded-xl border border-primary/10 hover:bg-primary/20 transition-all text-[10px] font-black uppercase tracking-widest">
                      Edit
                    </button>
                  </EditProfileModal>
                )}

                <div className="flex gap-2">
                  {profile.githubUrl && (
                    <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                      <GithubIcon size={20} />
                    </a>
                  )}
                  {profile.twitterUrl && (
                    <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                      <TwitterIcon size={20} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm font-mono text-primary/60 uppercase tracking-[0.4em] font-bold">
                @{profile.username}
              </p>
            </div>

            <p className="text-on-surface-variant/70 text-lg leading-relaxed max-w-2xl font-sans italic mx-auto md:mx-0">
              {profile.bio ? (
                `"${profile.bio}"`
              ) : isMyProfile ? (
                 <EditProfileModal profile={profile} onUpdate={(updated) => setProfile({...profile, ...updated})}>
                   <button className="flex items-center gap-2 text-primary hover:underline hover:scale-105 transition-all text-sm font-mono uppercase tracking-widest">
                     <PlusCircle size={14} /> SYNC_BIO_FREQUENCY (Add your bio)
                   </button>
                 </EditProfileModal>
              ) : (
                "This node has not updated its bio frequency yet."
              )}
            </p>

            {/* Tech Stack Signals */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] uppercase tracking-widest font-mono text-on-surface-variant opacity-30">
                <Code size={12} className="text-primary" />
                <span>Synchronized_Stack</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <TagBadge key={index} label={skill} />
                  ))
                ) : isMyProfile ? (
                  <EditProfileModal profile={profile} onUpdate={(updated) => setProfile({...profile, ...updated})}>
                    <button className="flex items-center gap-2 text-xs px-4 py-2 border border-dashed border-primary/20 rounded-xl text-primary/60 hover:border-primary hover:text-primary transition-all">
                      <UserPlus size={14} /> ADD_CORE_STACK (Your skills)
                    </button>
                  </EditProfileModal>
                ) : (
                  <span className="text-xs italic text-on-surface-variant/20">Missing_Dependency_Stack</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📋 Activity Sector Header */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-black text-on-surface-variant/30 uppercase tracking-[0.3em] font-mono flex items-center gap-3">
          <Activity size={14} className="text-primary/40" />
          Neural_Activity_History
        </h3>
        <div className="h-[1px] flex-1 bg-white/5 mx-6"></div>
      </div>

      {/* 📡 Signal Grid Feed (at least 4 in a row on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {profile.posts && profile.posts.length > 0 ? (
          profile.posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/posts/${post.id}`} 
              className="group relative aspect-square bg-surface-container/20 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/40 hover:scale-[1.02] transition-all duration-500 shadow-xl"
            >
              {/* 🖼️ Post Image or Placeholder */}
              {post.imageUrl ? (
                <img 
                  src={getAvatarUrl(post.imageUrl)} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Code size={20} className="text-primary/20 mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-[9px] font-mono text-on-surface-variant/40 line-clamp-3 uppercase tracking-tighter">
                    {post.content}
                  </p>
                </div>
              )}

              {/* 🕵️ Over-Hover Info (Glassmorphism Overlay) */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                 <div className="flex items-center gap-2 text-white font-black italic text-sm">
                   <MessageSquare size={16} className="text-primary" /> 
                   {post._count?.comments || 0}
                 </div>
                 <div className="text-[10px] uppercase font-mono text-primary/80 absolute bottom-4">
                    Inspect_Node
                 </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full p-20 text-center border border-dashed border-white/5 rounded-[3rem] opacity-20 italic font-mono text-sm uppercase tracking-widest">
            Silence_Detected. No data streams found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
