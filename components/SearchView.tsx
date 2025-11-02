import React from 'react';
import type { Post as PostType } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { GridPostItem } from './GridPostItem';

interface SearchViewProps {
    posts: PostType[];
  }
  
export const SearchView: React.FC<SearchViewProps> = ({ posts }) => {
    return (
      <div className="animate-fade-in">
        <div className="p-2 sticky top-[57px] bg-black z-10">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
              aria-label="Search content"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map(post => (
            <GridPostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
};
