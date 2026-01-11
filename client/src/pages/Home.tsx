import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../lib/api"; 
import { 
  ArrowRight, 
  Code2, 
  Globe, 
  Layout, 
  Rocket, 
  Terminal, 
  Users,
  Layers,
  Cpu,
  Database,
  Cloud,
  Search,
  Sparkles,
  Plus,
  Loader2,
  Github,
  ExternalLink
} from "lucide-react";


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

// ==========================================
const DashboardView = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Data
  useEffect(() => {
    const fetchFeed = async () => {
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
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
        {/* Heading: Latest Projects */}
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

         {/* Load More */}
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

// ==========================================
const LandingView = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Hero Section */}
      <section className="relative px-4 py-10 md:py-14 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            The Platform for All Developers
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Showcase Your Projects <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Inspire the World
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Codial is the universal stage for developers of every stack. 
            Share your work, gain visibility, and build a portfolio that speaks louder than a resume.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link to="/signup">
              <button className="w-full sm:w-auto h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold cursor-pointer
                 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                Start Building <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/explore">
              <button className="w-full sm:w-auto h-12 px-8 rounded-md bg-background border border-input cursor-pointer
                 hover:bg-accent hover:text-accent-foreground font-medium transition-colors flex items-center justify-center gap-2">
                Explore Projects <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-14 px-4 bg-background border-t border-border/40">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Why Developers Choose Codial</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether you write Python, Java, JS, or Go—we provide the tools to amplify your work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-2xl bg-secondary/20 border border-border">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Universal Portfolio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create a stunning developer profile that acts as your live resume. 
                Our platform supports all project types, from web apps and mobile builds to CLIs and data science notebooks.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/20 border border-border">
              <div className="bg-blue-500/10 text-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Exposure</h3>
              <p className="text-muted-foreground">
                Get your projects in front of thousands of peers, contributors, and potential recruiters from around the globe.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/20 border border-border">
              <div className="bg-purple-500/10 text-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Feedback</h3>
              <p className="text-muted-foreground">
                Don't code in a silo. Receive code reviews, architectural advice, and UI/UX suggestions from experienced developers.
              </p>
            </div>
            <div className="md:col-span-2 p-8 rounded-2xl bg-secondary/20 border border-border">
              <div className="bg-orange-500/10 text-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Career Acceleration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Turn your side projects into proof of competence. Recruiters look for active 
                builders—Codial gives you the platform to show that you can ship code in any language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-16 border-t border-border/50 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-10">
            Supporting Every Stack & Framework
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
            <div className="flex items-center gap-2 font-bold text-xl"><Terminal className="w-5 h-5" /> Python</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Code2 className="w-5 h-5" /> Java</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-5 h-5" /> JavaScript</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Layers className="w-5 h-5" /> Go</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Database className="w-5 h-5" /> SQL</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Layout className="w-5 h-5" /> React</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Cpu className="w-5 h-5" /> Rust</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Cloud className="w-5 h-5" /> Docker</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Terminal className="w-5 h-5" /> C++</div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 relative z-10">
            Code in any language.<br/> Share on one platform.
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Join the community of developers who are documenting their journey on Codial.
          </p>
          <Link to="/signup" className="relative z-10">
            <button className="h-12 px-8 rounded-md bg-background text-foreground font-bold 
              hover:bg-secondary transition-colors shadow-xl cursor-pointer">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// ==========================================

const Home = () => {
  const token = localStorage.getItem("token");

  // If token exists, show Dashboard. Else show Landing.
  return token ? <DashboardView /> : <LandingView />;
};

export default Home;