import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { 
  Mail, 
  Lock, 
  Loader2, 
  ArrowRight
} from "lucide-react";
import { Logo } from "../components/logo/logo";

// Define a type for the expected API error structure
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      toast.success("Welcome back!");
      
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Login error", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Background Decor (Matching Landing Page) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-20 left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-[20%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Field */}
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
                className="block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground ml-1" htmlFor="password">Password</label>
              {/* Removed Forgot Password Link */}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;