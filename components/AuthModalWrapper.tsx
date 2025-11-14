import React, { Component } from "react";
import AuthModal from "./AuthModal";

/**
 * Class component wrapper for AuthModal to prevent ANY re-renders
 * This ensures the modal state persists even when parent components update
 */
class AuthModalWrapper extends Component {
  // Class components don't re-render unless props/state change
  // Since we have no props or state, this will NEVER re-render
  shouldComponentUpdate() {
    return false; // Never update
  }

  render() {
    return (
      <div className="fixed inset-0 bg-black" style={{ touchAction: 'manipulation' }}>
        <AuthModal />
      </div>
    );
  }
}

export default AuthModalWrapper;
