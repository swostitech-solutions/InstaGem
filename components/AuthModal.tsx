import React, { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  // Use sessionStorage to persist modal state across re-renders
  const getInitialModalState = () => {
    const stored = sessionStorage.getItem("authModalState");
    return stored === "register" ? false : true; // true = login, false = register
  };

  const [showLogin, setShowLogin] = useState(getInitialModalState);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    sessionStorage.setItem("authModalState", "register");
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
    sessionStorage.setItem("authModalState", "login");
  };

  return (
    <div
      className="min-h-screen bg-black overflow-hidden"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        touchAction: "manipulation",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {showLogin ? (
        <LoginModal
          key="login"
          onClose={() => {}}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterModal
          key="register"
          onClose={() => {}}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};

export default AuthModal;
