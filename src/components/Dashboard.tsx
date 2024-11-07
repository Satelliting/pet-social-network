import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) {
    navigate("/login");
  } else {
    return (
      <div>
        <h1>Welcome to your Dashboard, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>User ID: {user.$id}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
};

export default Dashboard;
