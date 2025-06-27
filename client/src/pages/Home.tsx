import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Codial</span>
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mb-6">
          Showcase your MERN stack projects, connect with fellow developers, and build your coding portfolio in one place.
        </p>

        <div className="flexspace-x-4 ">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/explore"
            className=" bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
          >
            Explore Projects <span>&#8594;</span>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-10 px-4 border-t">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Projects</h3>
            <p className="text-gray-600">Add live links, GitHub, and thumbnails to show your work professionally.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Dashboard</h3>
            <p className="text-gray-600">Manage your profile and project portfolio with ease.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Discovery</h3>
            <p className="text-gray-600">Browse and get inspired by other MERN developers' projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;