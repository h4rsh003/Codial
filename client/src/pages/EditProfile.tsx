import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  User, 
  Code, 
  Github, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  Save 
} from "lucide-react";
import { Logo } from "../components/logo/logo";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    github: "",
    resume: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data.user;
        setFormData({
          name: user.name || "",
          skills: user.skills || "",
          github: user.github || "",
          resume: user.resume || "",
        });
        if (user.avatar) setPreviewUrl(user.avatar);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Login required.");
        setLoading(false);
        return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("skills", formData.skills);
    form.append("github", formData.github);
    form.append("resume", formData.resume);
    if (avatar) form.append("avatar", avatar);

    try {
      await api.put("/user/update", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const inputClasses = "block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden py-12">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-xl bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Edit Profile</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your personal details and portfolio links
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="name">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <User size={18} />
              </div>
              <input
                id="name"
                type="text"
                className={inputClasses}
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="skills">Skills</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Code size={18} />
              </div>
              <input
                id="skills"
                type="text"
                className={inputClasses}
                placeholder="JavaScript, React, Node.js..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
          </div>

          {/* Github */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="github">GitHub Profile</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Github size={18} />
              </div>
              <input
                id="github"
                type="url"
                className={inputClasses}
                placeholder="https://github.com/..."
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="resume">Resume Link</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <FileText size={18} />
              </div>
              <input
                id="resume"
                type="url"
                className={inputClasses}
                placeholder="https://drive.google.com/..."
                value={formData.resume}
                onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="avatar">Profile Picture</label>
            
            <div className="flex items-center gap-4 p-3 border border-dashed border-border rounded-lg bg-background/50 hover:bg-background transition-colors">
              <div className="relative flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label 
                  htmlFor="avatar" 
                  className="cursor-pointer text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                >
                  <Upload size={14} />
                  Change Picture
                </label>
                <input 
                  id="avatar" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF (Max 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Save Changes <Save className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;