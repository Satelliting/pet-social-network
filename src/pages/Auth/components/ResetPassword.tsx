// src/components/ResetPassword.tsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (!userId || !secret) {
    navigate("/reset-password-request");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      await resetPassword(userId!, secret!, password);
      setMessage(
        "Your password has been reset successfully! Redirecting to login."
      );
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Set New Password
      </h2>
      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={secret!}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-200"
          disabled
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
