import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const ResetPasswordRequest: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { resetPasswordRequest } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      await resetPasswordRequest(email);
      setMessage("Check your email for the recovery link!");
    } catch (error) {
      console.error("Error sending recovery email:", error);
      setMessage("Failed to send recovery email. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Reset Password</h2>
      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Send Recovery Email
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Remember your password?
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
