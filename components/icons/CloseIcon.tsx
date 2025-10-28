import React from 'react';

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    aria-label="Close" 
    color="rgb(245, 245, 245)" 
    fill="rgb(245, 245, 245)" 
    height="24" 
    role="img" 
    viewBox="0 0 24 24" 
    width="24" 
    {...props}
  >
    <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);