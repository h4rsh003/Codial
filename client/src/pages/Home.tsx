import { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import api from "../lib/api"; 
import { 
  ArrowRight, 
  Search,
  Sparkles,
  Plus,
  Loader2
} from "lucide-react";

import ProjectCard from '../components/projectCard/page';

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string; 
  github: string;
  liveLink?: string;
  thumbnail?: string;
  user: {
    name: string;
  };
};

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeed = async () => {

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);

        const res = await api.get("/projects/explore");
        const allProjects = Array.isArray(res.data.projects) ? res.data.projects : [];

        setProjects(allProjects.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch dashboard feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* Header Section */}
      <div className="bg-secondary/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                Welcome Back <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                Here's what the community has been shipping.
              </p>
            </div>
            
            <Link to="/upload-project">
              <button className="px-6 py-3 bg-primary text-primary-foreground cursor-pointer font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" /> Upload Project
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Explore Projects</h2>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>Loading your feed...</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border">
                 <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                   <Search className="w-8 h-8 text-muted-foreground" />
                 </div>
                 <h3 className="text-xl font-bold text-foreground">No projects found</h3>
                 <p className="text-muted-foreground mt-2">Check back later for new updates.</p>
              </div>
            )}
          </>
        )}

         {/* View All Button */}
         {!loading && projects.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link to="/explore">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer
                  transition-colors border-b border-transparent hover:border-primary pb-0.5 flex items-center gap-2">
                  View all Projects <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
         )}
      </div>
    </div>
  );
};

export default HomePage;