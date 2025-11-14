import React, { useState, memo } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

const AuthModal: React.FC = memo(() => {
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
});

AuthModal.displayName = 'AuthModal';

export default AuthModal;
