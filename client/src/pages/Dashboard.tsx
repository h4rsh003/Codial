import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "../components/ui/button";

// User type definition
type User = {
  name: string;
  email: string;
  skills: string;
  github: string;
  resume: string;
  avatar: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

        <Button
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </Button>

      </div>

      <div className="space-y-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Skills:</strong> {user.skills}</p>
        <p><strong>GitHub:</strong>{" "}
          <a
            className="text-blue-500 underline"
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.github}
          </a>
        </p>
        <p><strong>Resume:</strong>{" "}
          <a
            className="text-blue-500 underline"
            href={user.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </p>
        <p><strong>My Projects:</strong>{" "}
          <a
            className="text-blue-500 underline"
            href="/my-projects"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Projects
          </a>
        </p>

        {user.avatar && (
          <div>
            <p><strong>Avatar:</strong></p>
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
