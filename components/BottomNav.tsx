
import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ReelsIcon } from './icons/ReelsIcon';
import { ShopIcon } from './icons/ShopIcon';
import { currentUser } from '../constants';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-10">
      <div className="max-w-md mx-auto flex justify-around items-center h-12">
        <button aria-label="Home">
          <HomeIcon className="w-6 h-6" isFilled={true} />
        </button>
        <button aria-label="Search">
          <SearchIcon className="w-6 h-6" />
        </button>
        <button aria-label="Reels">
          <ReelsIcon className="w-6 h-6" />
        </button>
        <button aria-label="Shop">
          <ShopIcon className="w-6 h-6" />
        </button>
        <button aria-label="Profile">
          <img
            src={currentUser.avatarUrl}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover border-2 border-white"
          />
        </button>
      </div>
    </nav>
  );
};
