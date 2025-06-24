import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);
            console.log("Login success", response.data);
            alert("Login Successful!");

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");

        } catch (err : any){
            console.error("Login error", err.response?.data || err.message);
            alert("Login failed. Check your credentials.");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-12 p-4 border rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login to Codial</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
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

                <Button type="submit" className="w-full mt-4">Login</Button>
            </form>
        </div>
    );
};

export default Login