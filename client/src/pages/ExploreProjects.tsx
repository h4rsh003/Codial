import { useState, useEffect } from 'react';
import api from "../lib/api";
import { 
  Search, 
  Sparkles,
  Loader2
} from 'lucide-react';
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

const ExploreProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/explore");
        setProjects(Array.isArray(res.data.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Failed to fetch explore projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(searchLower);
    const techMatch = project.techStack.toLowerCase().includes(searchLower);
    const authorMatch = project.user.name.toLowerCase().includes(searchLower);
    return titleMatch || techMatch || authorMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <div className="relative bg-secondary/30 border-b border-border overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-50 pointer-events-none">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-6 shadow-sm">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            <span>Discover Community Projects</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Explore <span className="text-primary relative inline-block">
              Masterpieces
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse open-source projects built by the community. Search by technology, title, or author.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-background/80 backdrop-blur-sm border border-input rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-lg shadow-primary/5 transition-all text-base"
              placeholder="Search by React, Node, or project name..."
            />
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            All Projects
          </h2>
          <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {filteredProjects.length} found
          </span>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>Fetching projects...</p>
          </div>
        ) : (
          <>
            {/* Projects Grid - Using Reusable ProjectCard Component */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border">
                <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No projects found</h3>
                <p className="text-muted-foreground mt-2">
                  We couldn't find any projects matching "{searchQuery}".
                </p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreProjects;