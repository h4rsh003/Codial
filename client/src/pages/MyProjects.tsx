import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
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
        alert("Failed to load projects.");
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Project deleted");
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Uploaded Projects</h1>
        <Button
          className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
          onClick={() => navigate("/upload-project")}
        >
          <Plus size={18} />
          Upload Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-center">You haven't uploaded any projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative flex flex-col border p-4 rounded-lg shadow-md space-y-2"
            >
              {project.thumbnail && (
                <img
                  src={`http://localhost:5000${project.thumbnail}`}
                  alt="thumbnail"
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                GitHub
              </a>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-600 underline"
                >
                  Live Link
                </a>
              )}
              <div className="absolute bottom-0 right-10">
                <Button
                  className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded"
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                >
                  Edit
                </Button>
              </div>

              {/* ✅ Bottom-Right Delete Icon */}
              <div className="absolute bottom-3 right-3">
                <Trash2
                  onClick={() => handleDelete(project._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  size={22}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;