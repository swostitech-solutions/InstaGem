import React, { useState } from "react";
import { AddIcon } from "./icons/AddIcon";
import { HeartIcon } from "./icons/HeartIcon";
import { MessengerIcon } from "./icons/MessengerIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { Logo } from "./icons/Logo";
import { BackIcon } from "./icons/BackIcon";
import { useAuth } from "../context/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { ProfileSettings } from "./ProfileSettings";

interface HeaderProps {
  onAddClick: () => void;
  isProfileView?: boolean;
  profileUsername?: string;
  onBackClick?: () => void;
  isCurrentUserProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onAddClick,
  isProfileView,
  profileUsername,
  onBackClick,
  isCurrentUserProfile,
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="sticky top-0 bg-black z-10 px-4 py-3 border-b border-gray-800">
        <div className="flex justify-between items-center h-[30px]">
          {isProfileView ? (
            <div className="flex items-center space-x-4">
              {!isCurrentUserProfile && (
                <button onClick={onBackClick} aria-label="Go back">
                  <BackIcon className="w-6 h-6" />
                </button>
              )}
              <span className="font-bold text-xl">{profileUsername}</span>
            </div>
          ) : (
            <Logo />
          )}

          <div className="flex items-center space-x-5">
            {isAuthenticated ? (
              <>
                {!isProfileView && (
                  <>
                    <button aria-label="Notifications">
                      <HeartIcon className="w-7 h-7" />
                    </button>
                    <button aria-label="Messages">
                      <MessengerIcon className="w-7 h-7" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowSettings(true)}
                  aria-label="Settings"
                  className="hover:opacity-70 transition"
                >
                  <SettingsIcon className="w-6 h-6" />
                </button>
                {user?.isAdmin && (
                  <a
                    href="/admin"
                    className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded font-semibold hover:opacity-90"
                  >
                    Admin
                  </a>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm text-white hover:text-gray-300 px-3 py-1 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showSettings && (
        <ProfileSettings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
};
