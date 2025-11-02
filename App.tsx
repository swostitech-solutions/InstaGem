import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { StoryTray } from './components/StoryTray';
import { BottomNav } from './components/BottomNav';
import { CaptionGeneratorModal } from './components/CaptionGeneratorModal';
import { stories, initialPosts, currentUser } from './constants';
import type { Post as PostType, Story } from './types';
import { StoryViewer } from './components/StoryViewer';
import { CommentModal } from './components/CommentModal';
import { ReelsView } from './components/ReelsView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SearchView } from './components/SearchView';

export type ActiveTab = 'home' | 'search' | 'reels' | 'shop' | 'profile';

const generateExplorePosts = (startIndex: number, count: number): PostType[] => {
  return Array.from({ length: count }).map((_, index) => {
      const postIndex = startIndex + index;
      const isVideo = Math.random() > 0.8;
      return {
          id: `ex_p${postIndex}`,
          user: { username: `creator_${postIndex}`, avatarUrl: `https://picsum.photos/seed/${200 + postIndex}/100/100` },
          mediaUrl: isVideo 
              ? 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
              : `https://picsum.photos/seed/${200 + postIndex}/300/300`,
          mediaType: isVideo ? 'video' : 'image',
          caption: `Explore content #${postIndex}. What a find!`,
          likes: Math.floor(Math.random() * 5000),
          comments: Array.from({length: Math.floor(Math.random() * 25)}).map((_, i) => ({
              user: `commenter_${i}`,
              text: 'Amazing!',
          })),
          timestamp: 'Recently',
      };
  });
};


const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [commentingPost, setCommentingPost] = useState<PostType | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [explorePosts, setExplorePosts] = useState<PostType[]>([]);
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);

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

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPosts: PostType[] = Array.from({ length: 3 }).map((_, index) => {
      const postIndex = posts.length + index + 1;
      const isVideo = Math.random() > 0.7; // 30% chance of being a video
      return {
        id: `p${postIndex}`,
        user: { 
            username: `user_${postIndex}`, 
            avatarUrl: `https://picsum.photos/seed/${postIndex}/100/100` 
        },
        mediaUrl: isVideo 
            ? 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' 
            : `https://picsum.photos/seed/${100 + postIndex}/600/800`,
        mediaType: isVideo ? 'video' : 'image',
        caption: `This is a dynamically loaded post #${postIndex}. Enjoy the view!`,
        likes: Math.floor(Math.random() * 2000),
        comments: [],
        timestamp: 'Just now',
      };
    });

    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setIsLoadingMore(false);
}, [isLoadingMore, posts.length]);

const loadMoreExplorePosts = useCallback(async () => {
  if (isLoadingExplore) return;
  setIsLoadingExplore(true);
  await new Promise(resolve => setTimeout(resolve, 1500));
  const newPosts = generateExplorePosts(explorePosts.length, 9);
  setExplorePosts(prevPosts => [...prevPosts, ...newPosts]);
  setIsLoadingExplore(false);
}, [isLoadingExplore, explorePosts.length]);

useEffect(() => {
  if (explorePosts.length === 0) {
    setExplorePosts(generateExplorePosts(0, 21));
  }
}, [explorePosts.length]);


  useEffect(() => {
    const handleScroll = () => {
      // Trigger load when user is 200px from the bottom
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 200) {
        return;
      }
      
      if (activeTab === 'home' && !isLoadingMore) {
        loadMorePosts();
      } else if (activeTab === 'search' && !isLoadingExplore) {
        loadMoreExplorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isLoadingMore, loadMorePosts, isLoadingExplore, loadMoreExplorePosts]);


  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <StoryTray stories={stories} onStoryClick={handleStoryClick} />
            <Feed posts={posts} onOpenComments={handleOpenComments} />
            {isLoadingMore && <LoadingSpinner />}
          </>
        );
      case 'reels':
        return <ReelsView />;
      case 'search':
        return (
          <>
            <SearchView posts={explorePosts} />
            {isLoadingExplore && <LoadingSpinner />}
          </>
        );
      case 'shop':
      case 'profile':
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-116px)] text-white bg-black animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon!</h2>
                <p className="text-gray-400">This feature is under construction.</p>
            </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="max-w-md mx-auto relative pb-16">
        <Header onAddClick={() => setIsModalOpen(true)} />
        {renderContent()}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
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