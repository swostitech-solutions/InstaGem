import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {/* Keep both mounted, show/hide with opacity and visibility for zero flicker */}
      <div 
        className={showLogin ? "opacity-100 visible" : "opacity-0 invisible absolute"} 
        style={{ transition: 'none' }}
      >
        <LoginModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToRegister={() => setShowLogin(false)}
        />
      </div>
      <div 
        className={!showLogin ? "opacity-100 visible" : "opacity-0 invisible absolute"} 
        style={{ transition: 'none' }}
      >
        <RegisterModal
          onClose={() => {}} // Can't close - auth is required
          onSwitchToLogin={() => setShowLogin(true)}
        />
      </div>
    </div>
  );
};

export default AuthModal;
