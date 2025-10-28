import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { StoryTray } from './components/StoryTray';
import { BottomNav } from './components/BottomNav';
import { CaptionGeneratorModal } from './components/CaptionGeneratorModal';
import { stories, initialPosts } from './constants';
import type { Post as PostType, Story } from './types';
import { StoryViewer } from './components/StoryViewer';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

  const handleAddPost = useCallback((newPost: Omit<PostType, 'id'>) => {
    setPosts(prevPosts => [
      { ...newPost, id: Date.now().toString() },
      ...prevPosts,
    ]);
  }, []);

  const handleStoryClick = (story: Story) => {
    setViewingStory(story);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="max-w-md mx-auto relative pb-16">
        <Header onAddClick={() => setIsModalOpen(true)} />
        <StoryTray stories={stories} onStoryClick={handleStoryClick} />
        <Feed posts={posts} />
        <BottomNav />
        {isModalOpen && (
          <CaptionGeneratorModal
            onClose={() => setIsModalOpen(false)}
            onPostCreated={handleAddPost}
          />
        )}
        {viewingStory && (
          <StoryViewer 
            story={viewingStory}
            onClose={() => setViewingStory(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;