
import React from 'react';
interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  isFilled?: boolean;
}
export const HeartIcon: React.FC<HeartIconProps> = ({ isFilled, ...props }) => (
  <svg
    aria-label={isFilled ? 'Unlike' : 'Like'}
    color={isFilled ? 'rgb(255, 48, 64)' : 'rgb(245, 245, 245)'}
    fill={isFilled ? 'rgb(255, 48, 64)' : 'none'}
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M16.792 3.904A4.989 4.989 0 0 1 22 8.79c0 4.472-4.543 8.262-10 11.21-5.457-2.948-10-6.738-10-11.21a4.989 4.989 0 0 1 5.208-4.886 4.989 4.989 0 0 1 4.792 4.886 4.989 4.989 0 0 1 4.792-4.886Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
