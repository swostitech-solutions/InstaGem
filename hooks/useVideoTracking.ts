import { useEffect, useRef, useCallback } from 'react';
import { trackWatch } from '../api/analyticsAPI';
import { useAuth } from '../context/AuthContext';

interface UseVideoTrackingProps {
  videoId: string;
  videoElement: HTMLVideoElement | null;
}

/**
 * Custom hook to track video watch progress and send analytics
 * Debounces API calls and sends final update on unmount
 */
export const useVideoTracking = ({ videoId, videoElement }: UseVideoTrackingProps) => {
  const { isAuthenticated, user } = useAuth();
  const lastUpdateRef = useRef<number>(0);
  const maxWatchedRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const sendTrackingUpdate = useCallback(async () => {
    if (!isAuthenticated || !user || !videoElement) return;

    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;

    // Only track if we have valid data
    if (isNaN(currentTime) || isNaN(duration) || duration === 0) return;

    // Update max watched time (in case user seeks backward)
    maxWatchedRef.current = Math.max(maxWatchedRef.current, Math.floor(currentTime));
    totalDurationRef.current = Math.floor(duration);

    try {
      await trackWatch(
        videoId,
        maxWatchedRef.current,
        totalDurationRef.current
      );
      lastUpdateRef.current = Date.now();
    } catch (error) {
      console.error('Error tracking video watch:', error);
    }
  }, [videoId, videoElement, isAuthenticated, user]);

  // Set up periodic tracking updates
  useEffect(() => {
    if (!videoElement || !isAuthenticated) return;

    const handleTimeUpdate = () => {
      const now = Date.now();
      // Update max watched time
      const currentTime = videoElement.currentTime;
      if (!isNaN(currentTime)) {
        maxWatchedRef.current = Math.max(maxWatchedRef.current, Math.floor(currentTime));
      }

      // Send update every 10 seconds
      if (now - lastUpdateRef.current >= 10000) {
        sendTrackingUpdate();
      }
    };

    const handleLoadedMetadata = () => {
      if (!isNaN(videoElement.duration)) {
        totalDurationRef.current = Math.floor(videoElement.duration);
      }
    };

    const handleEnded = () => {
      // Video finished - send final update
      sendTrackingUpdate();
    };

    const handlePause = () => {
      // Send update when user pauses
      sendTrackingUpdate();
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('pause', handlePause);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('pause', handlePause);
    };
  }, [videoElement, isAuthenticated, sendTrackingUpdate]);

  // Send final update when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      // Send final update with max watched duration
      if (isAuthenticated && user && maxWatchedRef.current > 0 && totalDurationRef.current > 0) {
        trackWatch(videoId, maxWatchedRef.current, totalDurationRef.current).catch((error) => {
          console.error('Error sending final watch update:', error);
        });
      }
    };
  }, [videoId, isAuthenticated, user]);

  return {
    maxWatched: maxWatchedRef.current,
    totalDuration: totalDurationRef.current,
  };
};
