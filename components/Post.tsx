import React, { useState, useRef, useEffect } from "react";
import type { Post as PostType, User } from "../types";
import { HeartIcon } from "./icons/HeartIcon";
import { CommentIcon } from "./icons/CommentIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { SaveIcon } from "./icons/SaveIcon";
import { OptionsIcon } from "./icons/OptionsIcon";
import { VolumeUpIcon } from "./icons/VolumeUpIcon";
import { VolumeOffIcon } from "./icons/VolumeOffIcon";
import { userLookup } from "../constants";
import * as postsAPI from "../api/postsAPI";
import * as videosAPI from "../api/videosAPI";
import * as feedbackAPI from "../api/feedbackAPI";
import { useAuth } from "../context/AuthContext";
import { useVideoTracking } from "../hooks/useVideoTracking";
import { VideoFeedbackModal } from "./VideoFeedbackModal";
import { RewardModal } from "./RewardModal";

interface PostProps {
  post: PostType;
  onOpenComments: (post: PostType) => void;
  onProfileClick: (user: User) => void;
}

export const Post: React.FC<PostProps> = ({
  post,
  onOpenComments,
  onProfileClick,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLikedByUser || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewards, setRewards] = useState<any>(null);
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track actual watch time (not seeking)
  const watchedSegmentsRef = useRef<Set<number>>(new Set());
  const actualWatchPercentageRef = useRef<number>(0);

  // Update like state when post prop changes
  useEffect(() => {
    setIsLiked(post.isLikedByUser || false);
    setLikesCount(post.likes);
  }, [post.id, post.isLikedByUser, post.likes]);

  // Track video watch progress (only for videos)
  useVideoTracking({
    videoId: post.id,
    videoElement: post.mediaType === 'video' ? videoRef.current : null,
  });

  // Monitor video progress and show feedback modal when completed
  useEffect(() => {
    const video = videoRef.current;
    if (!video || post.mediaType !== 'video' || !isAuthenticated) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
      setCurrentTime(video.currentTime);

      // Track actual watched segments (only when playing, not seeking)
      if (!video.paused && !video.seeking) {
        const currentSecond = Math.floor(video.currentTime);
        watchedSegmentsRef.current.add(currentSecond);
        
        // Calculate actual watch percentage
        const totalSeconds = Math.floor(video.duration);
        const watchedSeconds = watchedSegmentsRef.current.size;
        actualWatchPercentageRef.current = (watchedSeconds / totalSeconds) * 100;
      }

      // Show feedback modal when 90% ACTUALLY WATCHED (not just seeked) - but NOT for admins
      if (actualWatchPercentageRef.current >= 90 && !hasGivenFeedback && !showFeedbackModal && !user?.isAdmin) {
        setShowFeedbackModal(true);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [post.mediaType, post.id, isAuthenticated, hasGivenFeedback, showFeedbackModal]);

  const toggleLike = async () => {
    if (!isAuthenticated) {
      // For non-authenticated users, just toggle locally
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      return;
    }

    try {
      // Use different API based on media type
      if (post.mediaType === 'video') {
        const response = await videosAPI.likeVideo(post.id);
        setIsLiked(response.isLiked);
        setLikesCount(response.likes);
      } else {
        await postsAPI.likePost(post.id);
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      setIsLiked(isLiked);
    }
  };
  const toggleSave = () => setIsSaved(!isSaved);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoClick = () => {
    togglePlayPause();
    showControlsTemporarily();
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    if (post.mediaType === 'video') {
      showControlsTemporarily();
    }
  };

  const handleShare = async () => {
    if (isSharing) return;

    // Generate different links based on media type
    const shareUrl = post.mediaType === 'video' 
      ? `${window.location.origin}/video/${post.id}`
      : `${window.location.origin}/#post/${post.id}`;
    
    const shareData = {
      title: post.mediaType === 'video' 
        ? `Educational Video: ${post.caption.split('\n')[0].replace('📚 ', '')}`
        : `InstaGem post by ${post.user.username}`,
      text: post.caption,
      url: shareUrl,
    };

    setIsSharing(true);

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard! Share it on WhatsApp, social media, or anywhere you like!");
      }
    } catch (error: any) {
      // Don't log an error if the user cancels the share sheet
      if (error.name !== "AbortError") {
        console.error("Error sharing post:", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleFeedbackSubmit = async (feedbackData: any) => {
    try {
      const response = await feedbackAPI.submitVideoFeedback(post.id, feedbackData);
      
      if (response.success) {
        setHasGivenFeedback(true);
        setShowFeedbackModal(false);
        setRewards(response.rewards);
        setShowRewardModal(true);
      }
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      // If already gave feedback, just close the modal
      if (error.response?.status === 400) {
        setHasGivenFeedback(true);
        setShowFeedbackModal(false);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            // Auto-play when in view
            videoRef.current
              .play()
              .catch((error) => console.log("Autoplay was prevented:", error));
          } else {
            // Auto-pause when out of view
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // 50% of the video must be visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const renderCaption = (captionText: string) => {
    const parts = captionText.split(/(\B@[\w_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
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
        <button
          onClick={() => onProfileClick(post.user)}
          className="flex items-center"
        >
          <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={post.user.avatarUrl}
              alt={post.user.username}
            />
          </div>
          <span className="font-semibold text-sm ml-3">
            {post.user.username}
          </span>
        </button>
        <button className="ml-auto">
          <OptionsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Post Media */}
      <div className="relative bg-gray-900">
        {post.mediaType === "image" ? (
          <img
            src={post.mediaUrl}
            alt="Post content"
            className="w-full object-cover"
          />
        ) : (
          <div 
            className="relative" 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={post.mediaUrl}
              loop
              muted={isMuted}
              playsInline
              className="w-full cursor-pointer"
              onClick={handleVideoClick}
            />

            {/* Play/Pause Overlay - Mobile Optimized */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity pointer-events-none ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!isPlaying && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="pointer-events-auto bg-white/90 rounded-full p-3 sm:p-4 hover:bg-white transition-all transform hover:scale-110 active:scale-95"
                  aria-label="Play"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Video Controls Bar - Mobile Optimized */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 sm:p-4 transition-opacity ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Bar - Taller for mobile touch */}
              <div className="mb-2 sm:mb-3 px-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 sm:h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
                  }}
                />
              </div>

              {/* Controls Row - Bigger touch targets for mobile */}
              <div className="flex items-center justify-between text-white px-1">
                {/* Left: Play/Pause & Time */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="hover:scale-110 active:scale-95 transition-transform p-1 touch-manipulation"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm8 0a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    )}
                  </button>

                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Mute Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="hover:scale-110 active:scale-95 transition-transform p-1 touch-manipulation"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeOffIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <VolumeUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={toggleLike} aria-label="Like">
            <HeartIcon
              className={`w-7 h-7 transition-colors ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              isFilled={isLiked}
            />
          </button>
          <button onClick={() => onOpenComments(post)} aria-label="Comment">
            <CommentIcon className="w-7 h-7" />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share"
            disabled={isSharing}
            className="disabled:opacity-50"
          >
            <ShareIcon className="w-7 h-7" />
          </button>
        </div>
        <button onClick={toggleSave} aria-label="Save">
          <SaveIcon
            className={`w-7 h-7 transition-colors ${
              isSaved ? "text-yellow-400" : "text-white"
            }`}
            isFilled={isSaved}
          />
        </button>
      </div>

      {/* Post Info */}
      <div className="px-3 pb-4 text-sm">
        <div className="flex items-center gap-3 mb-1">
          <p className="font-semibold">{likesCount} likes</p>
          {post.mediaType === 'video' && post.views !== undefined && (
            <p className="text-gray-400">• {post.views.toLocaleString()} views</p>
          )}
        </div>
        <p className="mt-1 whitespace-pre-wrap">
          <button
            onClick={() => onProfileClick(post.user)}
            className="font-semibold"
          >
            {post.user.username}
          </button>
          <span className="ml-2">{renderCaption(post.caption)}</span>
        </p>
        {post.comments.length > 0 && (
          <button
            onClick={() => onOpenComments(post)}
            className="text-gray-400 mt-2 block text-left"
          >
            View all {post.comments.length} comments
          </button>
        )}
        <div className="flex items-center space-x-2 mt-2">
          <img
            src={
              user?.avatarUrl || "https://picsum.photos/seed/default/100/100"
            }
            alt="Your avatar"
            className="w-6 h-6 rounded-full"
          />
          <button
            onClick={() => onOpenComments(post)}
            className="text-gray-500 text-left flex-grow"
          >
            Add a comment...
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2 uppercase">{post.timestamp}</p>
      </div>

      {/* Video Feedback Modal */}
      {showFeedbackModal && post.mediaType === 'video' && (
        <VideoFeedbackModal
          videoId={post.id}
          videoTitle={post.caption.split('\n')[0].replace('📚 ', '')}
          completionPercentage={videoProgress}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {/* Reward Modal */}
      {showRewardModal && rewards && (
        <RewardModal
          rewards={rewards}
          onClose={() => setShowRewardModal(false)}
        />
      )}

      {/* Custom Slider Styles - Mobile Optimized */}
      <style>{`
        /* Webkit browsers (Chrome, Safari, Edge) */
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
          transition: all 0.2s;
        }
        
        .slider::-webkit-slider-thumb:hover,
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
        }
        
        /* Firefox */
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
          transition: all 0.2s;
        }
        
        .slider::-moz-range-thumb:hover,
        .slider::-moz-range-thumb:active {
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
        }

        /* Mobile: Larger touch targets */
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 18px;
            height: 18px;
          }
          
          .slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
          }
        }

        /* Ensure smooth touch interactions */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </article>
  );
};
