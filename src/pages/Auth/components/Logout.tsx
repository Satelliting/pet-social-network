import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";

const Logout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
      <p className="text-gray-700 mb-4">Are you sure you want to log out?</p>
      <div className="flex justify-between">
        <button
          onClick={handleLogout}
          className={`bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors ${
            loading ? "bg-red-300 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full mx-auto" />
          ) : (
            "Logout"
          )}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
