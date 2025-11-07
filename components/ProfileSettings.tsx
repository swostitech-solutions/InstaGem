import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as authAPI from "../api/authAPI";

interface ProfileSettingsProps {
  onClose: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  onClose,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "account" | "password"
  >("profile");

  // Profile form state
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [childAge, setChildAge] = useState(user?.childAge || 0);
  const [parentEmail, setParentEmail] = useState(user?.parentEmail || "");
  const [favoriteColor, setFavoriteColor] = useState(
    user?.favoriteColor || "purple"
  );

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // TODO: Call API to update profile
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters!",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // TODO: Call API to change password
      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to change password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "profile"
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "account"
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === "password"
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Password
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Message */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-900 text-green-100"
                  : "bg-red-900 text-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Edit Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={
                    avatarUrl || "https://picsum.photos/seed/default/100/100"
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{username}</h3>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:text-blue-400"
                  >
                    Change photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={150}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-gray-500 mt-1">{bio.length}/150</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Child's Age
                </label>
                <input
                  type="number"
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value) || 0)}
                  min="1"
                  max="17"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Parent Email
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Favorite Color
                </label>
                <select
                  value={favoriteColor}
                  onChange={(e) => setFavoriteColor(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="orange">Orange</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Account Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Username</span>
                    <span>@{user?.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Type</span>
                    <span>{user?.isAdmin ? "Admin" : "User"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Privacy & Security</h3>
                <div className="space-y-3">
                  <button className="w-full text-left text-sm hover:bg-gray-700 p-2 rounded">
                    Privacy Settings
                  </button>
                  <button className="w-full text-left text-sm hover:bg-gray-700 p-2 rounded">
                    Blocked Accounts
                  </button>
                  <button className="w-full text-left text-sm hover:bg-gray-700 p-2 rounded">
                    Data Download
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Log Out
              </button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-3 text-sm text-blue-200">
                <strong>Password Tips:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Use a mix of letters, numbers, and symbols</li>
                  <li>Avoid common words or patterns</li>
                  <li>Don't reuse passwords from other sites</li>
                </ul>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
