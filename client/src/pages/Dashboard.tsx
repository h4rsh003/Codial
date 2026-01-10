import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  User as UserIcon, 
  Mail, 
  Github, 
  FileText, 
  Edit3, 
  Layers, 
  Loader2, 
  ExternalLink,
  Code2,
  Briefcase
} from "lucide-react";

// User type definition
type User = {
  name: string;
  email: string;
  skills: string; // "React, Node, JS"
  github: string;
  resume: string;
  avatar: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first.");
          navigate("/login");
          return;
        }

        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Process skills string into array
  const skillsArray = user.skills 
    ? user.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* Header Section */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-background shadow-xl overflow-hidden bg-secondary">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                    <UserIcon size={48} />
                  </div>
                )}
              </div>
              <button 
                onClick={() => navigate("/edit-profile")}
                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                title="Edit Avatar"
              >
                <Edit3 size={16} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </span>
                {user.github && (
                  <a 
                    href={user.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Github size={16} /> GitHub Profile
                  </a>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button 
                onClick={() => navigate("/edit-profile")}
                className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
              <Link to="/upload-project">
                <button className="w-full px-4 py-2.5 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2">
                  <Layers size={18} /> Upload Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Stats/Links */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-primary" /> 
                Career Info
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resume</label>
                  {user.resume ? (
                    <a 
                      href={user.resume} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-1 flex items-center gap-2 text-primary hover:underline font-medium break-all"
                    >
                      <FileText size={16} /> View Resume <ExternalLink size={14} />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground italic mt-1">No resume uploaded</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-2">My Projects</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your portfolio items and track their performance.
              </p>
              <Link to="/my-projects">
                <button className="w-full py-2 bg-background/50 hover:bg-background border border-primary/20 text-primary font-semibold rounded-lg transition-all">
                  View All Projects
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Skills & Bio (Placeholder) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-primary" /> 
                Skills & Tech Stack
              </h3>
              
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-secondary/20 rounded-lg border border-dashed border-border">
                  <p className="text-muted-foreground text-sm mb-3">No skills listed yet.</p>
                  <button 
                    onClick={() => navigate("/edit-profile")}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Add Skills
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;