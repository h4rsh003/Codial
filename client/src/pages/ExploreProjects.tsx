import { useState, useEffect } from 'react';
import api from "../lib/api";
import { 
  Search, 
  Github, 
  ExternalLink, 
  Layout, 
  Terminal, 
  Sparkles,
  Loader2
} from 'lucide-react';

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


const ProjectCard = ({ project }: { project: Project }) => {

  const tags = project.techStack.split(',').map(tag => tag.trim()).filter(tag => tag);

  return (
    <div className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full">

      <div className="relative h-48 overflow-hidden bg-secondary/50">
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

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
            title="View Code"
          >
            <Github className="w-5 h-5" />
          </a>
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-primary text-white rounded-full hover:scale-110 transition-transform"
              title="Live Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>


      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-secondary-foreground border border-border">
                {project.user.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs text-muted-foreground">
                by <span className="font-medium text-foreground">{project.user.name}</span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-[10px] font-semibold rounded-md uppercase tracking-wider border border-border/50">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-[10px] text-muted-foreground">+{tags.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ExploreProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/explore");
        // Ensure we are setting an array, even if backend returns null/undefined
        setProjects(Array.isArray(res.data.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Failed to fetch explore projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter Logic
  const filteredProjects = projects.filter(project => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(searchLower);
    const techMatch = project.techStack.toLowerCase().includes(searchLower);
    const authorMatch = project.user.name.toLowerCase().includes(searchLower);
    return titleMatch || techMatch || authorMatch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">

      <div className="relative bg-secondary/30 border-b border-border overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-50 pointer-events-none">
           <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-6 shadow-sm">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            <span>Discover Community Projects</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Explore <span className="text-primary relative inline-block">
              Masterpieces
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse open-source projects built by the community. Search by technology, title, or author.
          </p>

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


      <div className="max-w-7xl mx-auto px-4 py-10">
        

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" /> 
            All Projects
          </h2>
          <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {filteredProjects.length} found
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>Fetching projects...</p>
          </div>
        ) : (
          <>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
 
              <div className="text-center py-20 bg-secondary/10 rounded-2xl border border-dashed border-border">
                <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-sm">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No projects found</h3>
                <p className="text-muted-foreground mt-2">We couldn't find any projects matching "{searchQuery}".</p>
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