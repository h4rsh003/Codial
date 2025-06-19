import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadProject from "./pages/UploadProject";
import MyProjects from "./pages/MyProjects";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/upload-project" element={<UploadProject />} />
        <Route path="/my-projects" element={<MyProjects />} />


      </Routes>
    </Router>
  );
};

export default App;
