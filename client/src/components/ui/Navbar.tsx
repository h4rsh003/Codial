import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./button";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Codial
                </Link>

                {/* Hamburger menu (mobile) */}
                <Button
                    className="sm:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </Button>

                {/* Links (desktop) */}
                <div className="hidden sm:flex space-x-6 items-center">
                    {token && (
                        <>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                            <Link to="/dashboard" className="hover:underline">
                                Dashboard
                            </Link>
                            <Link to="/upload-project" className="hover:underline">
                                Upload
                            </Link>
                            <Link to="/my-projects" className="hover:underline">
                                My Projects
                            </Link>
                            <Link to="/explore" className="hover:underline">
                                Explore
                            </Link>
                        </>
                    )}

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/signup" className="hover:underline">
                                Signup
                            </Link>
                            <span>/</span>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Links (mobile dropdown) */}
            {menuOpen && (
                <div className="sm:hidden mt-3 space-y-2 px-2">
                    {token && (
                        <>
                            <Link to="/" className="block hover:underline">
                                Home
                            </Link>
                            <Link to="/dashboard" className="block hover:underline">
                                Dashboard
                            </Link>
                            <Link to="/upload-project" className="block hover:underline">
                                Upload
                            </Link>
                            <Link to="/my-projects" className="block hover:underline">
                                My Projects
                            </Link>
                            <Link to="/explore" className="block hover:underline">
                                Explore
                            </Link>
                        </>
                    )}

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/signup" className="hover:underline">
                                Signup
                            </Link>
                            <span>/</span>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
