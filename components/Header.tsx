import React from 'react';
import { AddIcon } from './icons/AddIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MessengerIcon } from './icons/MessengerIcon';
import { Logo } from './icons/Logo';
import { BackIcon } from './icons/BackIcon';

interface HeaderProps {
  onAddClick: () => void;
  isProfileView?: boolean;
  profileUsername?: string;
  onBackClick?: () => void;
  isCurrentUserProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
    onAddClick, 
    isProfileView, 
    profileUsername, 
    onBackClick,
    isCurrentUserProfile
}) => {
  return (
    <header className="sticky top-0 bg-black z-10 px-4 py-3 border-b border-gray-800">
      <div className="flex justify-between items-center h-[30px]">
        {isProfileView ? (
            <div className="flex items-center space-x-4">
                {!isCurrentUserProfile && (
                    <button onClick={onBackClick} aria-label="Go back">
                        <BackIcon className="w-6 h-6" />
                    </button>
                )}
                <span className="font-bold text-xl">{profileUsername}</span>
            </div>
        ) : (
            <Logo />
        )}
        
        <div className="flex items-center space-x-5">
          <button onClick={onAddClick} aria-label="Create new post">
            <AddIcon className="w-7 h-7" />
          </button>
          {!isProfileView && (
            <>
              <button aria-label="Notifications">
                <HeartIcon className="w-7 h-7" />
              </button>
              <button aria-label="Messages">
                <MessengerIcon className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
