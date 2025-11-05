import React from 'react';
import type { User, Post as PostType } from '../types';
import { GridPostItem } from './GridPostItem';
import { GridIcon } from './icons/GridIcon';

interface ProfileViewProps {
  user: User;
  posts: PostType[];
}

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <span className="font-bold text-base block">{value}</span>
        <span className="text-gray-400 text-sm">{label}</span>
    </div>
);


export const ProfileView: React.FC<ProfileViewProps> = ({ user, posts }) => {
  return (
    <div className="animate-fade-in">
        {/* Profile Header */}
        <div className="px-4 pt-4 pb-6">
            <div className="flex items-center justify-between">
                <img 
                    src={user.avatarUrl} 
                    alt={user.username} 
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex items-center space-x-8">
                    <StatItem value={user.followers} label="Followers" />
                    <StatItem value={user.likedVideos?.length || 0} label="Liked" />
                </div>
            </div>
            <div className="mt-4">
                <h2 className="font-semibold text-sm">{user.fullName}</h2>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{user.bio}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 font-semibold text-sm py-1.5 rounded-lg transition-colors">Follow</button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 font-semibold text-sm py-1.5 rounded-lg transition-colors">Message</button>
            </div>
        </div>

        {/* Post Grid */}
        <div className="border-t border-gray-800">
            <div className="flex justify-center border-b border-gray-800">
                <button className="p-3 border-t-2 border-white">
                    <GridIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
                {posts.map(post => (
                    <GridPostItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    </div>
  );
};
