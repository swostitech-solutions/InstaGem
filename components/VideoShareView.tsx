import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as videosAPI from "../api/videosAPI";
import type { Post as PostType } from "../types";
import { Post } from "./Post";
import { LoadingSpinner } from "./LoadingSpinner";
import { CommentModal } from "./CommentModal";
import { useAuth } from "../context/AuthContext";

export const VideoShareView: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [video, setVideo] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentingPost, setCommentingPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!videoId) {
        setError("Video ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await videosAPI.getVideo(videoId);

        // Transform video data to match Post interface
        const videoPost: PostType = {
          id: response.data._id,
          user: {
            username: response.data.uploadedBy?.username || "instagem",
            avatarUrl:
              response.data.uploadedBy?.avatarUrl ||
              "https://ui-avatars.com/api/?name=InstaGem&background=9333EA&color=fff",
            fullName: response.data.uploadedBy?.fullName || "InstaGem Education",
            bio: "Educational content for kids 📚",
            followers: 1000000,
            following: 0,
          },
          mediaUrl: response.data.videoUrl,
          mediaType: "video" as const,
          caption: `📚 ${response.data.title}\n\n${response.data.description}\n\n🎯 Ages ${response.data.ageGroup} | ${response.data.category}`,
          likes: response.data.likes?.length || 0,
          isLikedByUser: user?.likedVideos?.includes(response.data._id) || false,
          comments:
            response.data.comments?.map((c: any) => ({
              user: c.user?.username || "user",
              text: c.text,
            })) || [],
          timestamp: new Date(response.data.createdAt).toLocaleDateString(),
        };

        setVideo(videoPost);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching video:", err);
        setError("Failed to load video. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleOpenComments = (post: PostType) => {
    setCommentingPost(post);
  };

  const handleCloseComments = () => {
    setCommentingPost(null);
  };

  const handleAddComment = async (commentText: string) => {
    if (!commentText.trim() || !videoId) return;

    try {
      await videosAPI.addComment(videoId, commentText);

      // Update local state
      const newComment = { user: user?.username || "guest", text: commentText };
      
      if (video) {
        const updatedVideo = {
          ...video,
          comments: [...video.comments, newComment],
        };
        setVideo(updatedVideo);
        setCommentingPost(updatedVideo);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleProfileClick = () => {
    // Navigate to home page since profiles aren't standalone pages
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
        <p className="text-gray-400 mb-6">{error || "This video doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with back button */}
      <header className="sticky top-0 bg-black border-b border-gray-800 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-2xl hover:text-gray-400 transition-colors"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Educational Video</h1>
        </div>
      </header>

      {/* Video Post */}
      <main className="max-w-2xl mx-auto">
        <Post
          post={video}
          onOpenComments={handleOpenComments}
          onProfileClick={handleProfileClick}
        />

        {/* Call to Action */}
        <div className="p-6 text-center border-b border-gray-800">
          <p className="text-gray-400 mb-4">
            Want to see more educational videos?
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Explore InstaGem
          </button>
        </div>
      </main>

      {/* Comment Modal */}
      {commentingPost && (
        <CommentModal
          post={commentingPost}
          onClose={handleCloseComments}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};
