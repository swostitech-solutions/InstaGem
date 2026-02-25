import React, { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  onSwitchToLogin,
}) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    age: "",
    parentEmail: "",
    favoriteColor: "purple",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");

    // Validate age
    const age = parseInt(formData.age);
    if (age < 1 || age > 17) {
      setError("InstaGem is for kids aged 1-17 years old! 🎈");
      return;
    }

    // Require parent email for kids under 13
    if (age < 13 && !formData.parentEmail) {
      setError("We need your parent's email to keep you safe! 👨‍👩‍👧");
      return;
    }

    // Validate parent and kid emails are different
    if (formData.parentEmail && formData.parentEmail.toLowerCase() === formData.email.toLowerCase()) {
      setError("Your email and parent's email must be different! 🔄");
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        childAge: parseInt(formData.age),
        parentEmail: formData.parentEmail || undefined,
        favoriteColor: formData.favoriteColor,
      });
      // Success - modal will stay open until auth state updates
      // Don't call onClose, let the app handle the transition
    } catch (err: any) {
      setError(err.message || "Oops! Something went wrong. Try again! 🌟");
    } finally {
      setLoading(false);
    }
  };

  const colors = [
    { name: "Purple", value: "purple", bg: "bg-purple-500" },
    { name: "Blue", value: "blue", bg: "bg-blue-500" },
    { name: "Pink", value: "pink", bg: "bg-pink-500" },
    { name: "Green", value: "green", bg: "bg-green-500" },
    { name: "Orange", value: "orange", bg: "bg-orange-500" },
    { name: "Yellow", value: "yellow", bg: "bg-yellow-500" },
  ];

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4"
      style={{ touchAction: 'manipulation' }}
    >
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 max-w-lg w-full shadow-2xl border-2 border-purple-500 max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#8B5CF6 #1F2937" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - repositioned */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white text-xl sm:text-2xl transition z-10 bg-gray-800 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-700 active:scale-95"
        >
          ×
        </button>

        {/* Header with fun emoji */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">📱✨</div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to InstaGem!
          </h2>
          <p className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-semibold text-xs mt-1">
            Learn While You Watch! 📚🎬
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Educational reels & safe browsing for kids!
          </p>
        </div>

        {/* Trust Badge - Compact */}
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400 rounded-lg sm:rounded-xl">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <span className="text-base sm:text-xl">🛡️</span>
            <h3 className="text-green-400 font-bold text-xs">
              Safe & Educational
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs text-center">
            <div>
              <span className="text-sm sm:text-base">📖</span>
              <p className="text-gray-300 text-xs">Learn Daily</p>
            </div>
            <div>
              <span className="text-sm sm:text-base">👨‍👩‍👧</span>
              <p className="text-gray-300 text-xs">Parent Safe</p>
            </div>
            <div>
              <span className="text-sm sm:text-base">🎓</span>
              <p className="text-gray-300 text-xs">Age-Appropriate</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border-2 border-red-400 rounded-xl text-red-300 text-sm flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          {/* Kid's Name */}
          <div className="relative">
            <label
              htmlFor="fullName"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-1"
            >
              👶 Kid's Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-2.5 sm:px-3 py-2 bg-gray-800 border-2 border-purple-500 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition"
              placeholder="What's your name? ✨"
              required
            />
          </div>

          {/* Age */}
          <div className="relative">
            <label
              htmlFor="age"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-1"
            >
              🎂 How Old Are You?
            </label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-2.5 sm:px-3 py-2 bg-gray-800 border-2 border-blue-500 rounded-lg sm:rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              required
            >
              <option value="">Pick your age! 🎈</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
                (age) => (
                  <option key={age} value={age}>
                    {age} {age === 1 ? "year old" : "years old"}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Parent's Email */}
          <div className="relative">
            <label
              htmlFor="parentEmail"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-1"
            >
              👨‍👩‍👧 Parent's Email{" "}
              {parseInt(formData.age) < 13 && (
                <span className="text-red-400">*</span>
              )}
            </label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-2.5 sm:px-3 py-2 bg-gray-800 border-2 border-green-500 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              placeholder="parent@example.com"
              required={parseInt(formData.age) < 13}
            />
            {parseInt(formData.age) < 13 && (
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <span>🛡️</span>
                Required for your child's safety and account recovery
              </p>
            )}
            <div className="mt-2 p-2 sm:p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg sm:rounded-xl">
              <p className="text-xs text-blue-300 font-semibold mb-1">
                📊 For Parents: View Learning Analytics
              </p>
              <p className="text-xs text-gray-300">
                To see your child's progress, login with <span className="font-bold text-blue-400">this parent email</span> and <span className="font-bold text-blue-400">the same password</span> your child uses. You'll see their complete learning analytics! 🚀
              </p>
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-1"
            >
              🌟 Choose a Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-2.5 sm:px-3 py-2 bg-gray-800 border-2 border-yellow-500 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition"
              placeholder="coolkid123"
              required
              minLength={3}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-1"
            >
              📧 Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-2.5 sm:px-3 py-2 bg-gray-800 border-2 border-pink-500 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-1"
            >
              🔒 Create a Secret Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-3 py-2 bg-gray-800 border-2 border-purple-500 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              placeholder="Shh... it's a secret! 🤫"
              required
              minLength={6}
            />
          </div>

          {/* Favorite Color Picker */}
          <div className="relative">
            <label className="block text-xs font-bold text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text mb-1.5 sm:mb-2">
              🎨 Pick Your Favorite Color!
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, favoriteColor: color.value })
                  }
                  className={`${
                    color.bg
                  } py-1.5 sm:py-2 px-2 sm:px-3 rounded-md sm:rounded-lg font-bold text-white text-xs ${
                    formData.favoriteColor === color.value
                      ? "ring-2 ring-white shadow-xl scale-105"
                      : "opacity-70 active:opacity-100"
                  }`}
                  style={{ touchAction: 'manipulation' }}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Educational Benefits */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400 rounded-lg sm:rounded-xl p-2 sm:p-3 mt-1.5 sm:mt-2">
            <h4 className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1">
              <span>🌟</span>
              What Your Kid Will Learn:
            </h4>
            <ul className="text-xs text-gray-300 space-y-0.5">
              <li className="flex items-start gap-1">
                <span className="text-green-400 text-xs flex-shrink-0">✓</span>
                <span>Educational reels - Science, Art, Math & More!</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-400 text-xs flex-shrink-0">✓</span>
                <span>
                  Learn while having fun - Screen time that counts! 📚
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-400 text-xs flex-shrink-0">✓</span>
                <span>Safe environment - No inappropriate content 🛡️</span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-green-400 text-xs flex-shrink-0">✓</span>
                <span>
                  Age-appropriate for{" "}
                  {formData.age ? `${formData.age} year olds` : "your age"}
                </span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 active:from-purple-600 active:via-pink-600 active:to-blue-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-2 sm:mt-3 flex items-center justify-center gap-2 text-sm sm:text-base"
            style={{ touchAction: 'manipulation' }}
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span className="hidden sm:inline">Creating your account...</span>
                <span className="sm:hidden">Creating...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span className="hidden sm:inline">Start Learning & Having Fun!</span>
                <span className="sm:hidden">Start Learning!</span>
              </>
            )}
          </button>

          {/* Trust Message for Parents */}
          <div className="mt-1.5 sm:mt-2 text-center">
            <p className="text-xs text-gray-500 italic">
              "Let them watch. They'll learn something new every day!" 📱✨
            </p>
          </div>
        </form>

        {/* Switch to Login */}
        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-gray-400 text-xs">Already have an account? 🌈</p>
          <button
            onClick={onSwitchToLogin}
            className="mt-1 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-sm active:from-blue-300 active:to-purple-300"
            style={{ touchAction: 'manipulation' }}
          >
            Log In Here! ✨
          </button>
        </div>

        {/* Fun decorative elements - Optimized */}
        <div className="mt-2 sm:mt-3 flex justify-center gap-1.5 sm:gap-2 text-lg sm:text-xl opacity-50 pb-1 sm:pb-2">
          <span>🌟</span>
          <span>💫</span>
          <span>✨</span>
          <span>⭐</span>
        </div>
      </div>
    </div>
  );
};
