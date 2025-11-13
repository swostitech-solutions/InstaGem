import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black">
      {/* Keep both mounted to prevent unmount flicker, hide with CSS */}
      <div className={showLogin ? "block" : "hidden"}>
        <LoginModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToRegister={() => setShowLogin(false)}
        />
      </div>
      <div className={!showLogin ? "block" : "hidden"}>
        <RegisterModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToLogin={() => setShowLogin(true)}
        />
      </div>
    </div>
  );
};

export default AuthModal;
