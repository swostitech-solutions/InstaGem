import React from 'react';

export const ReelsView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-116px)] text-white bg-black animate-fade-in">
      <div className="w-16 h-16 border-4 border-gray-700 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <polygon fill="currentColor" points="20 21 12 13.44 4 21 4 3 20 3 20 21" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">Reels coming soon!</h2>
      <p className="text-gray-400">This feature is under construction.</p>
    </div>
  );
};
