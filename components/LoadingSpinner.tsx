import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
  </div>
);
