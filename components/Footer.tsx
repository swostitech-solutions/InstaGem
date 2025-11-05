import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 px-4 text-center text-gray-400 text-xs">
      <div className="max-w-2xl mx-auto space-y-3">
        <p className="font-semibold text-gray-300">
          🎓 InstaGem - Educational Platform for Kids
        </p>
        
        <p>
          All educational videos are embedded from their original sources on YouTube.
          We do not host, own, or claim any rights to the content.
        </p>
        
        <p>
          Content provided by: Khan Academy, National Geographic Kids, PBS Kids, 
          Sesame Street, NASA, TED-Ed, and other trusted educational creators.
        </p>
        
        <div className="flex justify-center gap-4 text-xs">
          <button 
            onClick={() => navigate('/terms-of-service')} 
            className="hover:text-white transition"
          >
            Terms of Service
          </button>
          <span>•</span>
          <button 
            onClick={() => navigate('/privacy-policy')} 
            className="hover:text-white transition"
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button 
            onClick={() => navigate('/content-guidelines')} 
            className="hover:text-white transition"
          >
            Content Guidelines
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          © 2025 InstaGem. All videos remain property of their respective creators.
        </p>
        
        <p className="text-xs text-gray-500">
          <span className="text-green-400">✓</span> Safe for Kids • 
          <span className="text-blue-400"> ✓</span> Parent Approved • 
          <span className="text-purple-400"> ✓</span> Educational Content
        </p>
      </div>
    </footer>
  );
};
