
import React from 'react';
export const ShopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    aria-label="Shop"
    color="rgb(245, 245, 245)"
    fill="rgb(245, 245, 245)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M12 1.505a10.5 10.5 0 1 1-10.5 10.5A10.509 10.509 0 0 1 12 1.505m0-1.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12Z"
      fill="currentColor"
    ></path>
    <path
      d="m12.001 6.542-.71 4.545-4.545.71.71 4.545 4.545.71.71-4.545 4.545-.71-.71-4.545-4.545-.71Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
