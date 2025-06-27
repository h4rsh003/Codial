import { useEffect, useState } from "react";
import api from "../lib/api";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/explore");
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Failed to fetch explore projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="border rounded-lg shadow p-4 space-y-2">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt="Project Thumbnail"
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Tech Stack:</strong> {project.techStack}</p>

            <div className="flex flex-wrap gap-3 mt-2">
              <a href={project.github} target="_blank" className="text-blue-500 underline">GitHub</a>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" className="text-blue-500 underline">Live Demo</a>
              )}
            </div>
            <p className="text-sm font-semibold">👤 {project.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProjects;