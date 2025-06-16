import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Input } from "../components/ui/input";
import api from "../lib/api";

const Signup = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("skills", formData.skills);
    form.append("github", formData.github);
    form.append("resume", formData.resume);
    if (avatar) form.append("avatar", avatar);

    try {
      const res = await api.post("/auth/signup", form, {
        withCredentials: true,
      });

      console.log("Signup success:", res.data);
      alert("Signup successful!");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data: any } };
        console.error("Signup error:", axiosErr.response?.data || err);
        alert("Signup failed.");
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Codial Account</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="skills">Skills</Label>
          <Input
            id="skills"
            type="text"
            placeholder="JavaScript, MongoDB, etc."
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub Link</Label>
          <Input
            id="github"
            type="url"
            placeholder="https://github.com/yourusername"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="resume">Resume Link</Label>
          <Input
            id="resume"
            type="url"
            placeholder="https://your-resume-link.com"
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="avatar">Profile Avatar</Label>
          <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
          {previewUrl && (
            <img src={previewUrl} alt="Avatar Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
          )}
        </div>

        <Button type="submit" className="w-full mt-4">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;
