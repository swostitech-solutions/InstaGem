import React, { useEffect, useState } from 'react';
import type { Story } from '../types';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds

export const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Timer to automatically close the story after the duration
    const timer = setTimeout(() => {
      onClose();
    }, STORY_DURATION);

    // Interval to update the progress bar
    const interval = setInterval(() => {
      setProgress(p => p + 100 / (STORY_DURATION / 100));
    }, 100);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [story, onClose]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col p-2 sm:p-4 animate-fade-in">
      {/* Progress Bar */}
      <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
        <div 
          className="bg-white h-1 rounded-full" 
          style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        ></div>
      </div>
      
      {/* Story Header */}
      <header className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
          <img src={story.avatarUrl} alt={story.username} className="w-10 h-10 rounded-full" />
          <span className="font-semibold text-white">{story.username}</span>
        </div>
        <button onClick={onClose} aria-label="Close story" className="text-white text-3xl font-light">&times;</button>
      </header>
      
      {/* Story Content */}
      <main className="flex-grow flex items-center justify-center relative -mt-8">
        <img 
          src={story.avatarUrl.replace('/100/100', '/600/800')} 
          alt="Story content" 
          className="max-h-full w-auto h-auto max-w-full rounded-lg object-contain"
        />
      </main>
    </div>
  );
};