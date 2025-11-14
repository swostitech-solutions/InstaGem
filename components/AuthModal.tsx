import React, { useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div 
      className="min-h-screen bg-black overflow-hidden" 
      style={{ 
        position: 'fixed',
        width: '100%',
        height: '100%',
        touchAction: 'manipulation',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {showLogin ? (
        <LoginModal
          key="login"
          onClose={() => {}}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <RegisterModal
          key="register"
          onClose={() => {}}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthModal;
