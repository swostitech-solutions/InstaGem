
import React from 'react';
export const OptionsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-label="More options"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="6" cy="12" r="1.5"></circle>
    <circle cx="18" cy="12" r="1.5"></circle>
  </svg>
);
