import React, { useState, useEffect, useRef } from 'react';
import type { Post as PostType } from '../types';
import { CommentIcon } from './icons/CommentIcon';
import { HeartIcon } from './icons/HeartIcon';

const formatStats = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}m`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
};

export const GridPostItem: React.FC<{ post: PostType }> = ({ post }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (post.mediaType !== 'video' || !videoRef.current) return;
        
        if (isHovering) {
            videoRef.current.play().catch(() => {});
        } else {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isHovering, post.mediaType]);

    return (
    <div 
        className="relative aspect-square group cursor-pointer bg-gray-900"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={`Post by ${post.user.username}`}
    >
        {post.mediaType === 'image' ? (
        <img src={post.mediaUrl} alt={post.caption} className="w-full h-full object-cover" loading="lazy" />
        ) : (
        <video ref={videoRef} src={post.mediaUrl} muted loop playsInline className="w-full h-full object-cover" />
        )}

        {post.mediaType === 'video' && (
            <svg className="absolute top-2 right-2 w-5 h-5 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center" aria-hidden="true">
            <div className="flex items-center space-x-6 opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity">
                <div className="flex items-center space-x-2">
                    <HeartIcon className="w-6 h-6" isFilled={true} />
                    <span>{formatStats(post.likes)}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CommentIcon className="w-6 h-6" />
                    <span>{formatStats(post.comments.length)}</span>
                </div>
            </div>
        </div>
    </div>
    );
};
