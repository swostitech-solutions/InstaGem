import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* Keep both mounted to prevent unmount flicker, hide with CSS */}
      {/* Use pointer-events-none on hidden to prevent blocking clicks */}
      <div className={showLogin ? "block" : "hidden pointer-events-none"}>
        <LoginModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToRegister={() => setShowLogin(false)}
        />
      </div>
      <div className={!showLogin ? "block" : "hidden pointer-events-none"}>
        <RegisterModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToLogin={() => setShowLogin(true)}
        />
      </div>
    </>
  );
};

export default AuthModal;
