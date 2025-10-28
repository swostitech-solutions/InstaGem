import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { StoryTray } from './components/StoryTray';
import { BottomNav } from './components/BottomNav';
import { CaptionGeneratorModal } from './components/CaptionGeneratorModal';
import { stories, initialPosts, currentUser } from './constants';
import type { Post as PostType, Story } from './types';
import { StoryViewer } from './components/StoryViewer';
import { CommentModal } from './components/CommentModal';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [commentingPost, setCommentingPost] = useState<PostType | null>(null);

  const handleAddPost = useCallback((newPost: Omit<PostType, 'id'>) => {
    setPosts(prevPosts => [
      { ...newPost, id: Date.now().toString() },
      ...prevPosts,
    ]);
  }, []);

  const handleStoryClick = (story: Story) => {
    setViewingStory(story);
  };

  const handleOpenComments = (post: PostType) => {
    setCommentingPost(post);
  };

  const handleCloseComments = () => {
    setCommentingPost(null);
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;

    const newComment = { user: currentUser.username, text: commentText };

    const updatePostWithComment = (p: PostType) => ({
      ...p,
      comments: [...p.comments, newComment],
    });

    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? updatePostWithComment(p) : p))
    );

    setCommentingPost(prevPost =>
      prevPost && prevPost.id === postId ? updatePostWithComment(prevPost) : prevPost
    );
  };


  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="max-w-md mx-auto relative pb-16">
        <Header onAddClick={() => setIsModalOpen(true)} />
        <StoryTray stories={stories} onStoryClick={handleStoryClick} />
        <Feed posts={posts} onOpenComments={handleOpenComments} />
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
        {commentingPost && (
            <CommentModal
                post={commentingPost}
                onClose={handleCloseComments}
                onAddComment={(commentText) => handleAddComment(commentingPost.id, commentText)}
            />
        )}
      </div>
    </div>
  );
};

export default App;