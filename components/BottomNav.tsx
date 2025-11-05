import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ReelsIcon } from './icons/ReelsIcon';
import { ShopIcon } from './icons/ShopIcon';
import { useAuth } from '../context/AuthContext';
import type { ActiveTab } from '../App';

interface BottomNavProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-10">
      <div className="max-w-md mx-auto flex justify-around items-center h-12">
        <button aria-label="Home" onClick={() => onTabChange('home')}>
          <HomeIcon className="w-6 h-6" isFilled={activeTab === 'home'} />
        </button>
        <button aria-label="Search" onClick={() => onTabChange('search')}>
          <SearchIcon className="w-6 h-6" isFilled={activeTab === 'search'} />
        </button>
        <button aria-label="Reels" onClick={() => onTabChange('reels')}>
          <ReelsIcon className="w-6 h-6" isFilled={activeTab === 'reels'} />
        </button>
        <button aria-label="Shop" onClick={() => onTabChange('shop')}>
          <ShopIcon className="w-6 h-6" />
        </button>
        <button aria-label="Profile" onClick={() => onTabChange('profile')}>
          <img
            src={user?.avatarUrl || 'https://picsum.photos/seed/default/100/100'}
            alt="Profile"
            className={`w-6 h-6 rounded-full object-cover border-2 transition-colors ${activeTab === 'profile' ? 'border-white' : 'border-transparent'}`}
          />
        </button>
      </div>
    </nav>
  );
};