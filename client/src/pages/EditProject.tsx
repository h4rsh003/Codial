import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import api from "../lib/api";
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const EditProject = () => {

  type Project = {
    _id: string;
    title: string;
    description: string;
    techStack: string;
    github: string;
    liveLink?: string;
    thumbnail?: string;
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    liveLink: "",
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const res = await api.get(`/projects/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const project = res.data.projects.find((p: Project) => p._id === id);
        if (!project) {
          alert("Project not found.");
          return;
        }

        setFormData({
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          github: project.github,
          liveLink: project.liveLink || "",
        });

        if (project.thumbnail) {
          setPreviewUrl(`${IMAGE_URL}${project.thumbnail}`);
        }
      } catch (err) {
        console.error("Fetch project error:", err);
        alert("Failed to load project.");
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
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
      await api.put(`/projects/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project updated successfully!");
      navigate("/my-projects");
    } catch (err) {
      alert("Failed to update project.");
      if (err instanceof Error) {
        console.error("Update error:", err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Project</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            type="text"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub Link</Label>
          <Input
            id="github"
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="liveLink">Live Link</Label>
          <Input
            id="liveLink"
            type="url"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input id="thumbnail" type="file" accept="image/*" onChange={handleThumbnailChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Thumbnail Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <Button type="submit" className="w-full mt-4">
          Update Project
        </Button>
      </form>
    </div>
  );
};

export default EditProject;