import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import * as adminAPI from "../api/adminAPI";

// Dynamic import to avoid build errors
const VideoUploadForm = React.lazy(() => import("./VideoUploadForm"));

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  ageGroup: string;
  category: string;
  status: string;
  views: number;
  likes: any[];
  comments: any[];
  publishedAt?: Date;
  createdAt: Date;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");

  useEffect(() => {
    if (user?.isAdmin) {
      fetchVideos();
    }
  }, [user, filter]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const filterObj = filter !== "all" ? { status: filter } : {};
      const response = await adminAPI.getAllVideos(filterObj);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await adminAPI.publishVideo(id);
      fetchVideos();
    } catch (error) {
      console.error("Error publishing video:", error);
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await adminAPI.unpublishVideo(id);
      fetchVideos();
    } catch (error) {
      console.error("Error unpublishing video:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await adminAPI.deleteVideo(id);
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    fetchVideos();
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-400">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">📊 Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage educational videos</p>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition active:scale-95 w-full sm:w-auto"
          >
            + Upload Video
          </button>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <React.Suspense
            fallback={
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              </div>
            }
          >
            <VideoUploadForm
              onClose={() => setShowUploadForm(false)}
              onSuccess={handleUploadSuccess}
            />
          </React.Suspense>
        )}

        {/* Filters - Mobile Optimized */}
        <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
              filter === "all"
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All ({videos.length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
              filter === "draft"
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Drafts
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base whitespace-nowrap ${
              filter === "published"
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Published
          </button>
        </div>

        {/* Videos List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <p className="text-gray-400 text-base sm:text-lg">No videos found</p>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Upload your first video to get started!
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-3">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-gray-900 rounded-lg p-3 sm:p-4"
                >
                  {/* Video Info */}
                  <div className="flex gap-3 mb-3">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-24 sm:w-32 h-16 sm:h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs">
                      Ages {video.ageGroup}
                    </span>
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-400 rounded text-xs">
                      {video.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        video.status === "published"
                          ? "bg-green-900/50 text-green-400"
                          : "bg-yellow-900/50 text-yellow-400"
                      }`}
                    >
                      {video.status}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400 mb-3">
                    <span>👁 {video.views}</span>
                    <span>❤️ {video.likes?.length || 0}</span>
                    <span>💬 {video.comments?.length || 0}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {video.status === "draft" ? (
                      <button
                        onClick={() => handlePublish(video._id)}
                        className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded text-xs sm:text-sm transition"
                      >
                        ✓ Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnpublish(video._id)}
                        className="flex-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 rounded text-xs sm:text-sm transition"
                      >
                        ⏸ Unpublish
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded text-xs sm:text-sm transition"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-gray-900 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Video
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Age Group
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {videos.map((video) => (
                      <tr
                        key={video._id}
                        className="hover:bg-gray-800 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="w-24 h-14 object-cover rounded"
                            />
                            <div>
                              <p className="font-semibold">{video.title}</p>
                              <p className="text-sm text-gray-400 line-clamp-1">
                                {video.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-sm">
                            Ages {video.ageGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-300">{video.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-300">{video.views} views</p>
                            <p className="text-gray-400">
                              {video.likes?.length || 0} likes ·{" "}
                              {video.comments?.length || 0} comments
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              video.status === "published"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}
                          >
                            {video.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {video.status === "draft" ? (
                              <button
                                onClick={() => handlePublish(video._id)}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition"
                              >
                                Publish
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnpublish(video._id)}
                                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition"
                              >
                                Unpublish
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(video._id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
