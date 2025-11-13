import React, { useState, useEffect } from "react";
import * as analyticsAPI from "../api/analyticsAPI";

interface WatchHistoryItem {
  _id: string;
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  category: string;
  watchedDuration: number;
  totalDuration: number;
  completionPercentage: number;
  lastWatchedAt: string;
  watchCount: number;
}

interface CategoryProgress {
  category: string;
  totalVideos: number;
  completedVideos: number;
  totalWatchTime: number;
  averageCompletion: number;
  completionRate: string;
}

interface WatchHistoryProps {
  childId: string;
}

export const WatchHistory: React.FC<WatchHistoryProps> = ({ childId }) => {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [categories, setCategories] = useState<CategoryProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeView, setActiveView] = useState<"history" | "categories">(
    "history",
  );

  useEffect(() => {
    fetchHistory(1);
    fetchCategories();
  }, [childId]);

  const fetchHistory = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getChildWatchHistory(
        childId,
        pageNum,
        20,
      );

      if (pageNum === 1) {
        setHistory(response.data.history);
      } else {
        setHistory((prev) => [...prev, ...response.data.history]);
      }

      setHasMore(response.data.hasMore);
      setPage(pageNum);
    } catch (error: any) {
      console.error("Error fetching watch history:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await analyticsAPI.getChildCategoryProgress(childId);
      setCategories(response.data);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex space-x-2 bg-white/5 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView("history")}
          className={`px-4 py-2 rounded-md transition ${
            activeView === "history"
              ? "bg-purple-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          📺 Watch History
        </button>
        <button
          onClick={() => setActiveView("categories")}
          className={`px-4 py-2 rounded-md transition ${
            activeView === "categories"
              ? "bg-purple-500 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          📚 By Category
        </button>
      </div>

      {/* Watch History View */}
      {activeView === "history" && (
        <div className="bg-white/5 rounded-xl border border-purple-500/30 overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-purple-500/30">
            <h3 className="font-semibold text-lg text-purple-300">
              Recent Videos
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              All watched videos in chronological order
            </p>
          </div>

          <div className="divide-y divide-gray-800">
            {loading && page === 1 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-3">Loading watch history...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="text-5xl mb-3">📺</div>
                <p>No videos watched yet</p>
              </div>
            ) : (
              <>
                {history.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 hover:bg-white/5 transition"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-32 h-20 bg-gray-800 rounded-lg overflow-hidden">
                          {item.videoThumbnail && (
                            <img
                              src={item.videoThumbnail}
                              alt={item.videoTitle}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                          {formatDuration(item.watchedDuration)}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {item.videoTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">
                            {item.category}
                          </span>
                          <span>•</span>
                          <span>👁️ {item.watchCount}x</span>
                          <span>•</span>
                          <span>{formatDate(item.lastWatchedAt)}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">
                              {formatDuration(item.watchedDuration)} /{" "}
                              {formatDuration(item.totalDuration)}
                            </span>
                            <span
                              className={`font-semibold ${
                                item.completionPercentage >= 90
                                  ? "text-green-400"
                                  : item.completionPercentage >= 50
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {item.completionPercentage}%
                            </span>
                          </div>
                          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.completionPercentage >= 90
                                  ? "bg-green-500"
                                  : item.completionPercentage >= 50
                                    ? "bg-yellow-500"
                                    : "bg-purple-500"
                              }`}
                              style={{ width: `${item.completionPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More */}
                {hasMore && (
                  <div className="p-4 text-center">
                    <button
                      onClick={() => fetchHistory(page + 1)}
                      disabled={loading}
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-6 py-2 rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Categories View */}
      {activeView === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.length === 0 ? (
            <div className="col-span-2 bg-white/5 rounded-xl border border-purple-500/30 p-8 text-center text-gray-400">
              <div className="text-5xl mb-3">📚</div>
              <p>No category data available yet</p>
            </div>
          ) : (
            categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-purple-500/30 p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">
                    {cat.category}
                  </h4>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">
                      {cat.completionRate}%
                    </div>
                    <div className="text-xs text-gray-400">completion</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-blue-500/10 rounded-lg p-3 text-center">
                    <div className="text-blue-400 font-bold text-xl">
                      {cat.totalVideos}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">Videos</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 text-center">
                    <div className="text-green-400 font-bold text-xl">
                      {cat.completedVideos}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">Completed</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 text-center">
                    <div className="text-purple-400 font-bold text-xl">
                      {cat.totalWatchTime}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">Minutes</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${cat.averageCompletion}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    Average {cat.averageCompletion}% watched per video
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
