import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    github: "",
    resume: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data.user;
        setFormData({
          name: user.name,
          skills: user.skills,
          github: user.github,
          resume: user.resume,
        });
        if (user.avatar) setPreviewUrl(user.avatar);
      } catch (error) {
        console.error(error)
        alert("Failed to fetch user.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required.");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("skills", formData.skills);
    form.append("github", formData.github);
    form.append("resume", formData.resume);
    if (avatar) form.append("avatar", avatar);

    try {
      await api.put("/user/update", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated!");
      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub Link</Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="resume">Resume Link</Label>
          <Input
            id="resume"
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="avatar">Profile Picture</Label>
          <Input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="w-24 h-24 rounded-full mt-2 object-cover" />
          )}
        </div>

        <Button type="submit" className="w-full mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
