
import React from 'react';
export const ReelsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-label="Reels"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="4"
      x2="20"
      y1="9"
      y2="9"
    ></line>
  </svg>
);
