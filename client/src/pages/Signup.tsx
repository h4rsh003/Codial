import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  User, 
  Mail, 
  Lock, 
  Code, 
  Github, 
  FileText, 
  Image as ImageIcon, 
  Loader2, 
  ArrowRight,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";
import { Logo } from "../components/logo/logo";

// Define error type for safety
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    github: "",
    resume: "",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Validation Logic
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.length > 0 && value.length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (value.length > 0 && value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check before submission
    if (Object.values(errors).some(err => err) || !formData.name || !formData.email || !formData.password) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("skills", formData.skills);
    form.append("github", formData.github);
    form.append("resume", formData.resume); 
    if (avatar) form.append("avatar", avatar);

    try {
      const res = await api.post("/auth/signup", form);
      toast.success(res.data.message || "Signup successful!");
      navigate("/login");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        skills: "",
        github: "",
        resume: "",
      });
      setAvatar(null);
      setPreviewUrl(null);
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Signup error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for input classes to keep code clean
  const inputClasses = "block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden py-12">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 right-[20%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-[20%] w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-lg bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Join the Codial community today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* --- Mandatory Fields --- */}
          
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
                required
                className={`${inputClasses} ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="email">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Mail size={18} />
              </div>
              <input
                id="email"
                type="email"
                required
                className={`${inputClasses} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className={`${inputClasses} pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
          </div>

          <div className="my-6 border-t border-border/60"></div>

          {/* --- Optional Fields --- */}
          
          {/* Skills */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="skills">Skills</label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Code size={18} />
              </div>
              <input
                id="skills"
                type="text"
                className={inputClasses}
                placeholder="React, Node.js, Python..."
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="github">GitHub Profile</label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Github size={18} />
              </div>
              <input
                id="github"
                type="url"
                className={inputClasses}
                placeholder="https://github.com/username"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="resume">Resume Link</label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <FileText size={18} />
              </div>
              <input
                id="resume"
                type="url"
                className={inputClasses}
                placeholder="Google Drive / Portfolio link"
                value={formData.resume}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="avatar">Profile Picture</label>
              <span className="text-xs text-muted-foreground">(Optional)</span>
            </div>
            <div className="flex items-center gap-4 p-3 border border-dashed border-border rounded-lg bg-background/50 hover:bg-background transition-colors">
              <div className="relative flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label 
                  htmlFor="avatar" 
                  className="cursor-pointer text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                >
                  <Upload size={14} />
                  Upload Image
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
                Create Account <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;