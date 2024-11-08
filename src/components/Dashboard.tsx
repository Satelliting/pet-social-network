import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) {
    navigate("/auth/login");
  } else {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to your Dashboard,{" "}
          <span className="text-yellow-300">{user.name}</span>!
        </h1>
        <div className="bg-white text-gray-800 p-4 rounded-md mb-6 shadow-md">
          <p className="text-lg font-semibold">
            Email: <span className="text-gray-700">{user.email}</span>
          </p>
          <p className="text-lg font-semibold">
            User ID: <span className="text-gray-700">{user.$id}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-md transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    );
  }
};

export default Dashboard;
