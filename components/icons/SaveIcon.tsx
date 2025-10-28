
import React from 'react';
interface SaveIconProps extends React.SVGProps<SVGSVGElement> {
  isFilled?: boolean;
}
export const SaveIcon: React.FC<SaveIconProps> = ({ isFilled, ...props }) => (
  <svg
    aria-label={isFilled ? 'Unsave' : 'Save'}
    color="rgb(245, 245, 245)"
    fill={isFilled ? 'rgb(245, 245, 245)' : 'none'}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <polygon
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);
