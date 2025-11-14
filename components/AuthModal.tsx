import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {showLogin ? (
        <LoginModal
          onClose={() => {}}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterModal
          onClose={() => {}}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthModal;
