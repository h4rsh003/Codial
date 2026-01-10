import { Link, NavLink, useNavigate} from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Logo } from "../logo/logo";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setMenuOpen(false);
      toast.success("Logged out successfully!");
      navigate("/login");
    }
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-foreground font-bold" : "text-muted-foreground"
    }`;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Logo className="w-8 h-8" />
              <span className="text-2xl font-bold tracking-tighter text-foreground font-sans">
                Codial
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {token ? (
                <>
                  <NavLink to="/" className={navItemClass}>Home</NavLink>
                  <NavLink to="/explore" className={navItemClass}>Explore</NavLink>
                  <NavLink to="/dashboard" className={navItemClass}>Dashboard</NavLink>
                  <NavLink to="/upload-project" className={navItemClass}>Upload</NavLink>
                  <NavLink to="/my-projects" className={navItemClass}>My Projects</NavLink>
                  
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-4 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-6">
                  <NavLink to="/" className={navItemClass}>Home</NavLink>
                  
                  <div className="flex items-center gap-3">
                    <Link to="/login">
                      <button className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                        Log in
                      </button>
                    </Link>
                    
                    <Link to="/signup">
                      <button className="px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors">
                        Sign up
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-b border-border bg-background absolute w-full left-0 top-16 animate-in slide-in-from-top-5 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              {token ? (
                <>
                  <NavLink to="/" className={navItemClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
                  <NavLink to="/explore" className={navItemClass} onClick={() => setMenuOpen(false)}>Explore</NavLink>
                  <NavLink to="/dashboard" className={navItemClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                  <NavLink to="/upload-project" className={navItemClass} onClick={() => setMenuOpen(false)}>Upload</NavLink>
                  <NavLink to="/my-projects" className={navItemClass} onClick={() => setMenuOpen(false)}>My Projects</NavLink>
                  <hr className="border-border" />
                  <button 
                    onClick={handleLogout} 
                    className="text-left text-sm font-medium text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink to="/" className={navItemClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
                  
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <button className="w-full px-4 py-2 rounded-md text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;