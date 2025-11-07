import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <LoginModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </>
  );
};

export default AuthModal;
