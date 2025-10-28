
import React from 'react';
interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  isFilled?: boolean;
}
export const HomeIcon: React.FC<HomeIconProps> = ({ isFilled, ...props }) =>
  isFilled ? (
    <svg aria-label="Home" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24" {...props}>
      <path d="M9.005 16.545a1.5 1.5 0 0 0 2.49-1.416L11.5 2.165a1.5 1.5 0 0 0-2.49 1.416L9.005 16.545Z"></path>
      <path d="M14.995 16.545a1.5 1.5 0 0 0 2.49-1.416L17.5 2.165a1.5 1.5 0 0 0-2.49 1.416l-.005 12.964Z"></path>
      <path d="M21.23 16.27a1.5 1.5 0 0 0-1.25-1.035l-5.69-.952-1.99 11.96a1.5 1.5 0 0 0 1.036 1.25l5.69.952a1.5 1.5 0 0 0 1.25-1.035l.95-5.69Z"></path>
      <path d="M2.77 16.27a1.5 1.5 0 0 1 1.25-1.035l5.69-.952 1.99 11.96a1.5 1.5 0 0 1-1.036 1.25l-5.69.952a1.5 1.5 0 0 1-1.25-1.035l-.95-5.69Z"></path>
    </svg>
  ) : (
    <svg aria-label="Home" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24" {...props}>
      <path d="M9.005 16.545a1.5 1.5 0 0 0 2.49-1.416L11.5 2.165a1.5 1.5 0 0 0-2.49 1.416L9.005 16.545ZM14.995 16.545a1.5 1.5 0 0 0 2.49-1.416L17.5 2.165a1.5 1.5 0 0 0-2.49 1.416l-.005 12.964Z" fill="currentColor"></path>
      <path d="M21.23 16.27a1.5 1.5 0 0 0-1.25-1.035l-5.69-.952-1.99 11.96a1.5 1.5 0 0 0 1.036 1.25l5.69.952a1.5 1.5 0 0 0 1.25-1.035l.95-5.69Z" fill="currentColor"></path>
      <path d="M2.77 16.27a1.5 1.5 0 0 1 1.25-1.035l5.69-.952 1.99 11.96a1.5 1.5 0 0 1-1.036 1.25l-5.69.952a1.5 1.5 0 0 1-1.25-1.035l-.95-5.69Z" fill="currentColor"></path>
    </svg>
  );
