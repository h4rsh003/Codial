import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  Trash2, 
  Edit, 
  Github, 
  ExternalLink, 
  Plus, 
  Loader2, 
  Layout, 
  Search
} from "lucide-react";

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string;
  github: string;
  liveLink?: string;
  thumbnail?: string;
};

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/projects/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Project deleted successfully");
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete project.");
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.techStack.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Portfolio</h1>
              <p className="text-muted-foreground mt-2">Manage and update your showcased projects.</p>
            </div>
            <Link to="/upload-project">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90
               transition-all flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
                <Plus className="w-5 h-5" /> Upload New Project
              </button>
            </Link>
          </div>

          {/* Search */}
          {projects.length > 0 && (
            <div className="relative max-w-xl mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                placeholder="Search your projects..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-border">
            <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-border shadow-sm">
              <Layout className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No projects yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              You haven't uploaded any projects to your portfolio. Start showing off your work to the community!
            </p>
            <Link to="/upload-project" className="inline-block mt-8">
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl
               hover:bg-primary/90 transition-all cursor-pointer">
                Upload First Project
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
               const tags = project.techStack.split(',').map(t => t.trim()).filter(Boolean);
               
               return (
                <div key={project._id} className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-secondary/50 overflow-hidden">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Layout className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => navigate(`/edit-project/${project._id}`)}
                        className="p-2 bg-white/90 text-slate-700 rounded-lg hover:text-blue-600
                         hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project._id)}
                        className="p-2 bg-white/90 text-slate-700 rounded-lg hover:text-red-600
                         hover:bg-white shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-[10px] font-semibold rounded-md uppercase tracking-wider border border-border/50">
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="px-2 py-1 text-[10px] text-muted-foreground">+{tags.length - 3}</span>
                      )}
                    </div>

                    {/* Footer Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;