import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loginAttempt = await login(email, password);
    if (loginAttempt) {
      navigate("/dashboard");
    } else {
      setError("Failed to log in. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-200"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
            loading ? "bg-blue-300 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full mx-auto" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/auth/register"
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Need to register?
        </Link>
        <br />
        <Link
          to="/auth/reset-password-request"
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
