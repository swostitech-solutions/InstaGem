import React from 'react';

export const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    aria-label="Back" 
    color="rgb(245, 245, 245)" 
    fill="rgb(245, 245, 245)" 
    height="24" 
    role="img" 
    viewBox="0 0 24 24" 
    width="24" 
    {...props}
  >
    <path 
      d="M19 12H5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    ></path>
    <path 
      d="M12 19l-7-7 7-7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    ></path>
  </svg>
);
