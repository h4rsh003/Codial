import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  Type, 
  FileText, 
  Code, 
  Github, 
  Globe, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  ArrowRight 
} from "lucide-react";
import { Logo } from "../components/logo/logo";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const UploadProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    liveLink: "",
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("techStack", formData.techStack);
    form.append("github", formData.github);
    form.append("liveLink", formData.liveLink);
    if (thumbnail) form.append("thumbnail", thumbnail);

    try {
      await api.post("/projects", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Project uploaded successfully!");
      navigate("/my-projects"); 
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Upload error:", error);
      toast.error("Failed to upload project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden py-12">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-2xl bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Share Your Work</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Upload your project details to showcase your skills
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Project Title */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="title">Project Title</label>
              <span className="text-xs text-muted-foreground">{formData.title.length}/25</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Type size={18} />
              </div>
              <input
                id="title"
                type="text"
                required
                maxLength={25}
                className={inputClasses}
                placeholder="e.g. Portfolio Website"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="description">Description</label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-muted-foreground">
                <FileText size={18} />
              </div>
              <textarea
                id="description"
                required
                rows={3}
                maxLength={200}
                className="block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm resize-none"
                placeholder="Briefly describe what your project does..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="techStack">Tech Stack</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Code size={18} />
              </div>
              <input
                id="techStack"
                type="text"
                required
                className={inputClasses}
                placeholder="React, Node.js, MongoDB..."
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              />
            </div>
            <p className="text-xs text-muted-foreground ml-1">Use comma ( , ) to separate technologies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* GitHub Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="github">GitHub Repository</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Github size={18} />
                </div>
                <input
                  id="github"
                  type="url"
                  required
                  className={inputClasses}
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                />
              </div>
            </div>

            {/* Live Link */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground ml-1" htmlFor="liveLink">Live Demo</label>
                <span className="text-xs text-muted-foreground">(Optional)</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Globe size={18} />
                </div>
                <input
                  id="liveLink"
                  type="url"
                  className={inputClasses}
                  placeholder="https://yourproject.live"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="thumbnail">Project Thumbnail</label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            
            <div className="group relative border-2 border-dashed border-border rounded-xl p-6 transition-colors hover:border-primary/50 hover:bg-muted/50">
              <input 
                id="thumbnail" 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleThumbnailChange} 
              />
              
              <div className="flex flex-col items-center justify-center text-center gap-2">
                {previewUrl ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
                    <img
                      src={previewUrl}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium flex items-center gap-2">
                        <Upload size={16} /> Change Image
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <ImageIcon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Click to upload thumbnail</p>
                      <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max 800x400px)</p>
                    </div>
                  </>
                )}
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
                Upload Project <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProject;