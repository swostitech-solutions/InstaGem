import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onSwitchToRegister,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onClose();
      // Redirect is now handled in AuthContext
    } catch (err: any) {
      const errorMsg = err.message || "Login failed";
      if (errorMsg.includes("Invalid credentials")) {
        setError(
          "Invalid email or password. 🔐 Try creating a new account if you don't have one yet!"
        );
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 max-w-md w-full shadow-2xl border-2 border-blue-500 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header with fun emoji */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3">📱</div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
          <p className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-semibold text-xs sm:text-sm mt-1 sm:mt-2">
            Continue Your Learning Journey! 🌈
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Watch, Learn, and Grow Every Day! 📚✨
          </p>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-2xl sm:text-3xl transition"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border-2 border-red-400 rounded-xl text-red-300 text-sm flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
          {/* Email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-1 sm:mb-2"
            >
              📧 Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border-2 border-blue-500 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400 transition"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-1 sm:mb-2"
            >
              🔐 Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border-2 border-purple-500 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Your secret password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 active:from-blue-700 active:via-purple-700 active:to-pink-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Logging in...
              </>
            ) : (
              <>
                <span>🚀</span>
                Start Learning!
              </>
            )}
          </button>

          {/* Educational reminder */}
          <div className="mt-2 sm:mt-3 text-center">
            <p className="text-xs text-gray-400 italic flex items-center justify-center gap-1 flex-wrap">
              <span>📚</span>
              <span>New educational reels waiting for you!</span>
              <span>🎬</span>
            </p>
          </div>
        </form>

        {/* Switch to Register */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">New to InstaGem? 🌈</p>
          <button
            onClick={onSwitchToRegister}
            className="mt-1 sm:mt-2 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-sm sm:text-base hover:from-blue-300 hover:to-purple-300 transition"
          >
            Create Your Account! ✨
          </button>
        </div>

      </div>
    </div>
  );
};
