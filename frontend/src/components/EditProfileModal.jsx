import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Camera, Plus, X } from "lucide-react";

export default function EditProfileModal({ profile, onUpdate, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    bio: profile.bio || "",
    skills: profile.skills || [],
    githubUrl: profile.githubUrl || "",
    twitterUrl: profile.twitterUrl || "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(profile.avatarUrl || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(); // 📡 Sending as FormData for the image upload!
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      data.append("githubUrl", formData.githubUrl);
      data.append("twitterUrl", formData.twitterUrl);
      data.append("skills", JSON.stringify(formData.skills)); // Send skills as string for the backend to parse
      if (imageFile) data.append("avatar", imageFile);

      const response = await api.put("/users/me", data);
      onUpdate(response.user); // 🚀 Update the ProfilePage UI
      setIsOpen(false);
    } catch (err) {
      alert("Transmission failed error in sync.");
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the same imports and logic at the top)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-surface-container border-white/5 rounded-[2.5rem] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic tracking-tighter">NEURAL_CONFIG_SYNC</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* 🖼️ Avatar Selection */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">Visual_Signal (Optional)</label>
            <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-input').click()}>
               <div className="w-28 h-28 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/40">
                 {imagePreview ? (
                   <img src={imagePreview} className="w-full h-full object-cover" />
                 ) : (
                   <Camera className="text-primary opacity-20" size={32} />
                 )}
               </div>
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] backdrop-blur-sm">
                 <Camera className="text-white animate-pulse" size={24} />
               </div>
               <input id="avatar-input" type="file" hidden accept="image/*" onChange={handleImageChange} />
            </div>
          </div>

          <div className="space-y-6">
            {/* 👤 Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 text-white/70">Ident_Name</label>
              <input 
                placeholder="Ex: Rajesh Node" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-sm focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:opacity-20"
              />
            </div>

            {/* 📝 Bio Textarea */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 text-white/70">Neural_Biography</label>
              <textarea 
                 placeholder="What's your story?" 
                 rows={3} 
                 value={formData.bio}
                 onChange={(e) => setFormData({...formData, bio: e.target.value})}
                 className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-sm italic resize-none outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:opacity-20"
              />
            </div>
            
            {/* 🔗 Social Links Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 text-white/70">Github_Link</label>
                <input 
                  placeholder="https://github.com/..." 
                  value={formData.githubUrl} 
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:opacity-20 font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 text-white/70">Twitter_Link</label>
                <input 
                  placeholder="https://twitter.com/..." 
                  value={formData.twitterUrl} 
                  onChange={(e) => setFormData({...formData, twitterUrl: e.target.value})}
                  className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:opacity-20 font-mono"
                />
              </div>
            </div>

            {/* 🧪 Skills Section */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 text-white/70">Core_Dependencies (Skills)</label>
              <div className="flex gap-2">
                <input 
                  placeholder="Type skill (e.g. React, nodejs)" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 bg-black/20 border border-white/5 p-4 rounded-2xl text-xs outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <Button type="button" onClick={handleAddSkill} size="lg" className="rounded-2xl px-6 bg-white/5 hover:bg-primary/20 hover:text-primary transition-all border border-white/5">
                  <Plus size={20} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 px-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="bg-primary/5 text-primary/70 text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2 border border-primary/10 group/skill">
                    {skill}
                    <X size={12} className="cursor-pointer opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all" onClick={() => setFormData({...formData, skills: formData.skills.filter(s => s !== skill)})}/>
                  </span>
                ))}
                {formData.skills.length === 0 && <span className="text-[10px] italic opacity-20 px-1">No dependencies identified...</span>}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full py-7 font-black tracking-[0.3em] bg-primary text-black rounded-3xl shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all active:scale-95 group">
             {loading ? <Loader2 className="animate-spin" /> : (
               <span className="flex items-center gap-3">
                 UPDATE_SIGNAL_IDENTITY
               </span>
             )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );


}
