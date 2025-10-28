
import React from 'react';
import { AddIcon } from './icons/AddIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MessengerIcon } from './icons/MessengerIcon';
import { Logo } from './icons/Logo';

interface HeaderProps {
  onAddClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <header className="sticky top-0 bg-black z-10 px-4 py-3 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-5">
          <button onClick={onAddClick} aria-label="Create new post">
            <AddIcon className="w-7 h-7" />
          </button>
          <button aria-label="Notifications">
            <HeartIcon className="w-7 h-7" />
          </button>
          <button aria-label="Messages">
            <MessengerIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};
