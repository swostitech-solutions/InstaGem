
import React, { useState, useRef, useEffect } from 'react';
import type { Post as PostType } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SaveIcon } from './icons/SaveIcon';
import { OptionsIcon } from './icons/OptionsIcon';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { VolumeOffIcon } from './icons/VolumeOffIcon';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleLike = () => setIsLiked(!isLiked);
  const toggleSave = () => setIsSaved(!isSaved);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(error => console.log("Autoplay was prevented:", error));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // 50% of the video must be visible to play
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <article className="border-b border-gray-800">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={post.user.avatarUrl}
            alt={post.user.username}
          />
        </div>
        <span className="font-semibold text-sm ml-3">{post.user.username}</span>
        <button className="ml-auto">
          <OptionsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Post Media */}
      <div className="relative bg-gray-900">
        {post.mediaType === 'image' ? (
          <img src={post.mediaUrl} alt="Post content" className="w-full object-cover" />
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              src={post.mediaUrl}
              loop
              muted={isMuted}
              playsInline
              className="w-full"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeOffIcon className="w-4 h-4" /> : <VolumeUpIcon className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={toggleLike} aria-label="Like">
            <HeartIcon
              className={`w-7 h-7 transition-colors ${isLiked ? 'text-red-500' : 'text-white'}`}
              isFilled={isLiked}
            />
          </button>
          <button aria-label="Comment">
            <CommentIcon className="w-7 h-7" />
          </button>
          <button aria-label="Share">
            <ShareIcon className="w-7 h-7" />
          </button>
        </div>
        <button onClick={toggleSave} aria-label="Save">
          <SaveIcon
            className={`w-7 h-7 transition-colors ${isSaved ? 'text-yellow-400' : 'text-white'}`}
            isFilled={isSaved}
          />
        </button>
      </div>

      {/* Post Info */}
      <div className="px-3 pb-4 text-sm">
        <p className="font-semibold">{isLiked ? post.likes + 1 : post.likes} likes</p>
        <p className="mt-1">
          <span className="font-semibold">{post.user.username}</span>
          <span className="ml-2">{post.caption}</span>
        </p>
        <p className="text-gray-400 mt-2">View all {post.comments.length} comments</p>
        <p className="text-gray-500 text-xs mt-1 uppercase">{post.timestamp}</p>
      </div>
    </article>
  );
};
