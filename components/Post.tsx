import React, { useState, useRef, useEffect } from 'react';
import type { Post as PostType, User } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { SaveIcon } from './icons/SaveIcon';
import { OptionsIcon } from './icons/OptionsIcon';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { VolumeOffIcon } from './icons/VolumeOffIcon';
import { userLookup } from '../constants';
import * as postsAPI from '../api/postsAPI';
import { useAuth } from '../context/AuthContext';

interface PostProps {
  post: PostType;
  onOpenComments: (post: PostType) => void;
  onProfileClick: (user: User) => void;
}

export const Post: React.FC<PostProps> = ({ post, onOpenComments, onProfileClick }) => {
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleLike = async () => {
    if (!isAuthenticated) {
      // For non-authenticated users, just toggle locally
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      return;
    }

    try {
      await postsAPI.likePost(post.id);
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const toggleSave = () => setIsSaved(!isSaved);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  const handleShare = async () => {
    if (isSharing) return;

    const postUrl = `${window.location.origin}/#post/${post.id}`;
    const shareData = {
      title: `InstaGem post by ${post.user.username}`,
      text: post.caption,
      url: postUrl,
    };

    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(postUrl);
        alert('Link copied to clipboard!');
      }
    } catch (error: any) {
      // Don't log an error if the user cancels the share sheet
      if (error.name !== 'AbortError') {
        console.error('Error sharing post:', error);
      }
    } finally {
      setIsSharing(false);
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

  const renderCaption = (captionText: string) => {
    const parts = captionText.split(/(\B@[\w_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.substring(1);
        const user = userLookup.get(username);
        if (user) {
          return (
            <button
              key={index}
              onClick={() => onProfileClick(user)}
              className="font-semibold text-blue-400 hover:underline"
            >
              {part}
            </button>
          );
        }
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <article className="border-b border-gray-800">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <button onClick={() => onProfileClick(post.user)} className="flex items-center">
            <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={post.user.avatarUrl}
                alt={post.user.username}
              />
            </div>
            <span className="font-semibold text-sm ml-3">{post.user.username}</span>
        </button>
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
          <button onClick={() => onOpenComments(post)} aria-label="Comment">
            <CommentIcon className="w-7 h-7" />
          </button>
          <button onClick={handleShare} aria-label="Share" disabled={isSharing} className="disabled:opacity-50">
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
        <p className="font-semibold">{likesCount} likes</p>
        <p className="mt-1 whitespace-pre-wrap">
            <button onClick={() => onProfileClick(post.user)} className="font-semibold">{post.user.username}</button>
          <span className="ml-2">{renderCaption(post.caption)}</span>
        </p>
        {post.comments.length > 0 && (
            <button onClick={() => onOpenComments(post)} className="text-gray-400 mt-2 block text-left">
                View all {post.comments.length} comments
            </button>
        )}
        <div className="flex items-center space-x-2 mt-2">
            <img src={user?.avatarUrl || 'https://picsum.photos/seed/default/100/100'} alt="Your avatar" className="w-6 h-6 rounded-full" />
            <button onClick={() => onOpenComments(post)} className="text-gray-500 text-left flex-grow">
                Add a comment...
            </button>
        </div>
        <p className="text-gray-500 text-xs mt-2 uppercase">{post.timestamp}</p>
      </div>
    </article>
  );
};
