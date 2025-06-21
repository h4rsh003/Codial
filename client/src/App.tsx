import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadProject from "./pages/UploadProject";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject";
import ExploreProjects from "./pages/ExploreProjects";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";


const App = () => {
  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/upload-project" element={<UploadProject />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/explore" element={<ExploreProjects />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
