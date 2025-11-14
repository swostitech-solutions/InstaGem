import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Feed } from "./components/Feed";
import { StoryTray } from "./components/StoryTray";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";
import { initialPosts } from "./constants";
import type { Post as PostType, Story, User } from "./types";
import { StoryViewer } from "./components/StoryViewer";
import { CommentModal } from "./components/CommentModal";
import { ReelsView } from "./components/ReelsView";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SearchView } from "./components/SearchView";
import { ProfileView } from "./components/ProfileView";
import * as postsAPI from "./api/postsAPI";
import * as videosAPI from "./api/videosAPI";
import { useAuth } from "./context/AuthContext";
import WelcomeMessage from "./src/components/WelcomeMessage";
import AuthModal from "./components/AuthModal";
import AdminDashboard from "./components/AdminDashboard";

export type ActiveTab = "home" | "search" | "reels" | "shop" | "profile";

const generateExplorePosts = (
  startIndex: number,
  count: number
): PostType[] => {
  return Array.from({ length: count }).map((_, index) => {
    const postIndex = startIndex + index;
    const isVideo = Math.random() > 0.8;
    return {
      id: `ex_p${postIndex}`,
      user: {
        username: `creator_${postIndex}`,
        avatarUrl: `https://picsum.photos/seed/${200 + postIndex}/100/100`,
        fullName: `Creator ${postIndex}`,
        bio: "Sharing my creative journey with the world. ✨",
        followers: Math.floor(Math.random() * 10000),
        following: Math.floor(Math.random() * 500),
      },
      mediaUrl: isVideo
        ? "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        : `https://picsum.photos/seed/${200 + postIndex}/300/300`,
      mediaType: isVideo ? "video" : "image",
      caption: `Explore content #${postIndex}. What a find!`,
      likes: Math.floor(Math.random() * 5000),
      comments: Array.from({ length: Math.floor(Math.random() * 25) }).map(
        (_, i) => ({
          user: `commenter_${i}`,
          text: "Amazing!",
        })
      ),
      timestamp: "Recently",
    };
  });
};

const App: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [viewingStory, setViewingStory] = useState<Story | null>(null);
  const [commentingPost, setCommentingPost] = useState<PostType | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [explorePosts, setExplorePosts] = useState<PostType[]>([]);
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<User | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // Clear session flag on component unmount (page refresh)
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('postsLoaded');
    };
  }, []);

  // Fetch posts from API (admin uploaded videos)
  const fetchPosts = useCallback(async (page: number = 1) => {
    try {
      setIsLoadingPosts(true);

      // Fetch videos from API based on user's age
      const response = await videosAPI.getVideos(undefined, page);

      // Get current liked videos from localStorage to avoid stale closure
      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;

      // Transform video data to match Post interface
      const videoPosts = response.data.map((video: any) => ({
        id: video._id,
        user: {
          username: video.uploadedBy?.username || "instagem",
          avatarUrl:
            video.uploadedBy?.avatarUrl ||
            "https://ui-avatars.com/api/?name=InstaGem&background=9333EA&color=fff",
          fullName: video.uploadedBy?.fullName || "InstaGem Education",
          bio: "Educational content for kids 📚",
          followers: 1000000,
          following: 0,
        },
        mediaUrl: video.videoUrl,
        mediaType: "video" as const,
        caption: `📚 ${video.title}\n\n${video.description}\n\n🎯 Ages ${video.ageGroup} | ${video.category}`,
        likes: video.likes?.length || 0,
        views: video.views || 0,
        isLikedByUser: currentUser?.likedVideos?.includes(video._id) || false,
        comments:
          video.comments?.map((c: any) => ({
            user: c.user?.username || "user",
            text: c.text,
          })) || [],
        timestamp: new Date(
          video.publishedAt || video.createdAt
        ).toLocaleDateString(),
      }));

      if (page === 1) {
        setPosts(videoPosts);
      } else {
        setPosts((prev) => [...prev, ...videoPosts]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setPosts([]);
    } finally {
      setIsLoadingPosts(false);
    }
  }, []); // Remove user dependency to prevent infinite loop

  // Load posts on mount and when auth changes
  useEffect(() => {
    // If still loading auth, wait
    if (loading) return;

    // Only run once when authentication is determined
    const hasRun = sessionStorage.getItem('postsLoaded');
    
    // If authenticated
    if (isAuthenticated && user) {
      // Redirect parents to their dashboard
      if (user.isParent) {
        navigate("/parent-dashboard", { replace: true });
        return;
      }
      // Fetch posts for children (only if not already loaded this session)
      if (!hasRun) {
        fetchPosts(1);
        sessionStorage.setItem('postsLoaded', 'true');
      }
    } else if (!isAuthenticated && !hasRun) {
      // Fetch posts for unauthenticated users (guests)
      fetchPosts(1);
      sessionStorage.setItem('postsLoaded', 'true');
    }
  }, [isAuthenticated, loading, user, navigate]); // Remove fetchPosts from dependencies

  const handleStoryClick = (story: Story) => {
    setViewingStory(story);
  };

  const handleOpenComments = (post: PostType) => {
    setCommentingPost(post);
  };

  const handleCloseComments = () => {
    setCommentingPost(null);
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    if (!commentText.trim()) return;

    try {
      if (isAuthenticated && user) {
        // Find the post to determine if it's a video or regular post
        const post = posts.find(p => p.id === postId) || commentingPost;
        
        // Add comment via appropriate API
        if (post?.mediaType === 'video') {
          await videosAPI.addComment(postId, commentText);
        } else {
          await postsAPI.addComment(postId, commentText);
        }

        // Update local state
        const newComment = { user: user.username, text: commentText };

        const updatePostWithComment = (p: PostType) => ({
          ...p,
          comments: [...p.comments, newComment],
        });

        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === postId ? updatePostWithComment(p) : p))
        );

        setCommentingPost((prevPost) =>
          prevPost && prevPost.id === postId
            ? updatePostWithComment(prevPost)
            : prevPost
        );
      } else {
        // Fallback for non-authenticated users (mock data)
        const newComment = {
          user: user?.username || "anonymous",
          text: commentText,
        };

        const updatePostWithComment = (p: PostType) => ({
          ...p,
          comments: [...p.comments, newComment],
        });

        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === postId ? updatePostWithComment(p) : p))
        );

        setCommentingPost((prevPost) =>
          prevPost && prevPost.id === postId
            ? updatePostWithComment(prevPost)
            : prevPost
        );
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      await fetchPosts(nextPage);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
      // Mark as reached end if error loading more
      setHasReachedEnd(true);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, currentPage, fetchPosts]);

  const loadMoreExplorePosts = useCallback(async () => {
    if (isLoadingExplore) return;
    setIsLoadingExplore(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newPosts = generateExplorePosts(explorePosts.length, 9);
    setExplorePosts((prevPosts) => [...prevPosts, ...newPosts]);
    setIsLoadingExplore(false);
  }, [isLoadingExplore, explorePosts.length]);

  useEffect(() => {
    if (explorePosts.length === 0) {
      setExplorePosts(generateExplorePosts(0, 21));
    }
  }, [explorePosts.length]);

  const handleProfileClick = (user: User) => {
    window.scrollTo(0, 0);
    setViewingProfile(user);
    setActiveTab("profile");
  };

  const handleBackFromProfile = () => {
    setViewingProfile(null);
    setActiveTab("home");
  };

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === "profile" && user) {
      setViewingProfile({
        ...user,
        username: user.username || user.email.split('@')[0],
        avatarUrl: user.avatarUrl || 'https://picsum.photos/seed/default/100/100',
        bio: user.bio || '',
        followers: user.followers || 0,
        following: user.following || 0,
      });
    } else {
      setViewingProfile(null);
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (viewingProfile) return; // Don't load content when viewing a profile

      // Prevent flickering at top of page
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
      if (scrollTop < 0) return;

      if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 200
      ) {
        return;
      }

      if (activeTab === "home" && !isLoadingMore) {
        loadMorePosts();
      } else if (activeTab === "search" && !isLoadingExplore) {
        loadMoreExplorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    activeTab,
    isLoadingMore,
    loadMorePosts,
    isLoadingExplore,
    loadMoreExplorePosts,
    viewingProfile,
  ]);

  const renderContent = () => {
    if (activeTab === "profile" && viewingProfile) {
      const allPosts = [...posts, ...explorePosts];
      const userPosts = allPosts.filter(
        (p) => p.user.username === viewingProfile.username
      );
      // Deduplicate posts
      const uniqueUserPosts = Array.from(
        new Map(userPosts.map((p) => [p.id, p])).values()
      );

      return <ProfileView user={viewingProfile} posts={uniqueUserPosts} />;
    }

    switch (activeTab) {
      case "home":
        return (
          <>
            <StoryTray stories={[]} onStoryClick={handleStoryClick} />
            {isLoadingPosts && posts.length === 0 ? (
              <LoadingSpinner />
            ) : (
              <>
                <Feed
                  posts={posts}
                  onOpenComments={handleOpenComments}
                  onProfileClick={handleProfileClick}
                />
                {isLoadingMore && <LoadingSpinner />}
                {!isLoadingMore && hasReachedEnd && posts.length > 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      You've reached the end!
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Wow! You watched all the awesome videos! 🌟
                    </p>
                    <p className="text-gray-500 text-xs">
                      Come back later for more educational fun! 📚🎥
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        );
      case "reels":
        return <ReelsView />;
      case "search":
        return (
          <>
            <SearchView posts={explorePosts} />
            {isLoadingExplore && <LoadingSpinner />}
            {!isLoadingExplore && explorePosts.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="text-6xl mb-4">🔍✨</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  That's all for now!
                </h3>
                <p className="text-gray-400 text-sm">
                  Try searching for something else! 🚀
                </p>
              </div>
            )}
          </>
        );
      case "shop":
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-116px)] text-white bg-black animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Shop coming soon!</h2>
            <p className="text-gray-400">This feature is under construction.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading state - Only show if actually loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Show login modal if not authenticated
  // Memoize AuthModal to prevent re-mounting on parent re-renders
  const authModalElement = useMemo(() => (
    <div className="fixed inset-0 bg-black" style={{ touchAction: 'manipulation' }}>
      <AuthModal />
    </div>
  ), []);

  if (!isAuthenticated) {
    return authModalElement;
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <WelcomeMessage />
      <div className="max-w-md mx-auto relative pb-16">
        <Header
          onAddClick={() => {}} // No-op since we removed upload
          isProfileView={!!viewingProfile}
          profileUsername={viewingProfile?.username}
          onBackClick={handleBackFromProfile}
          isCurrentUserProfile={viewingProfile?.username === user?.username}
        />
        {renderContent()}
        <Footer />
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
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
            onAddComment={(commentText) =>
              handleAddComment(commentingPost.id, commentText)
            }
          />
        )}
      </div>
    </div>
  );
};

export default App;
