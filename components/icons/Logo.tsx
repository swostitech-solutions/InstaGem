
import React from 'react';
export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-label="Instagram"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="30"
    role="img"
    viewBox="0 0 96 96"
    width="100"
    {...props}
  >
    <title>Instagram</title>
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="48" fontFamily="cursive" fontWeight="bold">
      InstaGem
    </text>
  </svg>
);
