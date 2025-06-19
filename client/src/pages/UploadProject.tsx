import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

const UploadProject = () => {
  const navigate = useNavigate();
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
      await api.post("/projects", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project uploaded successfully!");
      navigate("/my-projects"); // or "/my-projects" if you want a separate page
    } catch (err: unknown) {
      console.error("Upload error:", err);
      alert("Failed to upload project.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Your Project</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="e.g. Portfolio Website"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Short project description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            type="text"
            placeholder="React, Node.js, MongoDB..."
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub Link</Label>
          <Input
            id="github"
            type="url"
            placeholder="https://github.com/..."
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="liveLink">Live Link (optional)</Label>
          <Input
            id="liveLink"
            type="url"
            placeholder="https://yourproject.live"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="thumbnail">Project Thumbnail</Label>
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
          Upload Project
        </Button>
      </form>
    </div>
  );
};

export default UploadProject;
