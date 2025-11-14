import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as analyticsAPI from "../api/analyticsAPI";
import WatchHistory from "./WatchHistory";

interface ChildSummary {
  _id: string;
  fullName: string;
  username: string;
  age: number;
  avatarUrl: string;
  stats: {
    totalVideosWatched: number;
    totalWatchTime: number;
    completedVideos: number;
    completionRate: string;
  };
}

interface ChildOverview {
  childInfo: { name: string; age: number; username: string };
  summary: {
    totalVideosWatched: number;
    totalWatchTime: number;
    completedVideos: number;
    averageCompletionRate: number;
    averageDailyTime: number;
  };
  dailyStats: Array<{ date: string; watchTime: number; videosWatched: number }>;
  topCategories: Array<{
    name: string;
    count: number;
    totalTime: number;
    completionRate: string;
  }>;
  recentVideos: Array<{
    videoId: string;
    title: string;
    category: string;
    completionPercentage: number;
    lastWatchedAt: string;
    watchCount: number;
    likes: number;
    comments: number;
  }>;
  timeRange: number;
}

interface Achievement {
  currentStreak: number;
  longestStreak: number;
  totalVideosCompleted: number;
  totalWatchTime: number;
  badges: Array<{ name: string; icon: string; description: string }>;
}

const ParentDashboard: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [overview, setOverview] = useState<ChildOverview | null>(null);
  const [achievements, setAchievements] = useState<Achievement | null>(null);
  const [timeRange, setTimeRange] = useState<string>("7");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "progress" | "achievements"
  >("overview");

  // Redirect non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchChildData(selectedChild);
    }
  }, [selectedChild, timeRange]);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getParentChildrenOverview();
      console.log("Children response:", response);
      setChildren(response.data);
      if (response.data.length > 0 && !selectedChild) {
        setSelectedChild(response.data[0]._id);
      }
    } catch (error: any) {
      console.error("Error fetching children:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildData = async (childId: string) => {
    try {
      const [overviewData, achievementsData] = await Promise.all([
        analyticsAPI.getChildOverview(childId, timeRange),
        analyticsAPI.getChildAchievements(childId),
      ]);
      console.log("Overview data:", overviewData);
      console.log("Achievements data:", achievementsData);
      setOverview(overviewData.data);
      setAchievements(achievementsData.data);
    } catch (error: any) {
      console.error("Error fetching child data:", error);
      console.error("Error details:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-yellow-400 mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
              🚀
            </div>
          </div>
          <p className="mt-6 text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
            Loading Amazing Analytics...
          </p>
        </div>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white flex flex-col items-center justify-center p-6">
        <div className="text-8xl mb-6 animate-bounce">👨‍👩‍👧‍👦</div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
          No Children Yet!
        </h2>
        <p className="text-gray-300 text-center max-w-md text-lg">
          Add your email as "Parent Email" when creating a child's account to
          see their learning journey here! ✨
        </p>
        <a
          href="/"
          className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transform hover:scale-110 transition"
        >
          ← Back to App
        </a>
      </div>
    );
  }

  const isSelected = (childId: string) => selectedChild === childId;
  const getTimeRangeButton = (days: string) => {
    const isActive = timeRange === days;
    return (
      <button
        key={days}
        onClick={() => setTimeRange(days)}
        className={
          isActive
            ? "px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-purple-900 shadow-2xl shadow-pink-500/50 scale-110 transition-all transform hover:scale-110"
            : "px-8 py-4 rounded-full font-bold text-lg bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all transform hover:scale-110"
        }
      >
        {isActive && "🔥 "}Last {days} Days
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white overflow-x-hidden pb-20">
      {/* OPTIMIZED HEADER - Mobile First */}
      <div className="bg-black/40 backdrop-blur-lg border-b-2 sm:border-b-4 border-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <div className="text-2xl sm:text-4xl md:text-5xl animate-bounce flex-shrink-0">📊</div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-2xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-pulse truncate">
                  PARENT DASHBOARD
                </h1>
                <p className="text-yellow-300 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 font-semibold hidden sm:block">
                  🌟 Track Your Child's Learning! 🚀
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              <a
                href="/"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-lg active:scale-95 transition flex items-center gap-1"
              >
                <span className="hidden sm:inline">←</span> Home
              </a>
              <button
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold shadow-lg active:scale-95 transition"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* CHILD SELECTOR - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center">
            <div className="text-xl sm:text-3xl">👶</div>
            <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              Your Kids
            </h2>
            <div className="text-xl sm:text-3xl">🌈</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {children.map((child) => (
              <button
                key={child._id}
                onClick={() => setSelectedChild(child._id)}
                className={
                  isSelected(child._id)
                    ? "group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all transform scale-105 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 shadow-2xl shadow-pink-500/50"
                    : "group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all transform active:scale-95 sm:hover:scale-105 bg-white/10 backdrop-blur-sm"
                }
              >
                {isSelected(child._id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 animate-pulse"></div>
                )}

                <div className="relative p-3 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={child.avatarUrl}
                        alt={child.fullName}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white/50 shadow-lg"
                      />
                      {isSelected(child._id) && (
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 text-purple-900 rounded-full p-0.5 sm:p-1 text-xs sm:text-base">
                          ⭐
                        </div>
                      )}
                    </div>

                    <div className="text-left flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-lg truncate">{child.fullName}</h3>
                      <p
                        className={
                          isSelected(child._id)
                            ? "text-xs sm:text-sm text-purple-100"
                            : "text-xs sm:text-sm text-gray-300"
                        }
                      >
                        🎂 Age {child.age}
                      </p>
                    </div>

                    <div className="text-center bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm flex-shrink-0">
                      <div className="text-xl sm:text-3xl font-black">
                        {child.stats.totalVideosWatched}
                      </div>
                      <div className="text-xs uppercase font-semibold">
                        videos
                      </div>
                    </div>
                  </div>

                  {isSelected(child._id) && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold text-base sm:text-lg">
                          {child.stats.totalWatchTime}
                        </div>
                        <div className="text-purple-100">mins</div>
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg">
                          {child.stats.completedVideos}
                        </div>
                        <div className="text-purple-100">done</div>
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg">
                          {child.stats.completionRate}%
                        </div>
                        <div className="text-purple-100">rate</div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* TIME RANGE SELECTOR - Mobile Optimized */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="text-lg sm:text-2xl flex-shrink-0">⏰</div>
          {["7", "14", "30"].map((days) => {
            const isActive = timeRange === days;
            return (
              <button
                key={days}
                onClick={() => setTimeRange(days)}
                className={
                  isActive
                    ? "px-4 sm:px-8 py-2 sm:py-4 rounded-full font-bold text-sm sm:text-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-purple-900 shadow-2xl shadow-pink-500/50 transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
                    : "px-4 sm:px-8 py-2 sm:py-4 rounded-full font-bold text-sm sm:text-lg bg-white/10 text-white backdrop-blur-sm transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
                }
              >
                {isActive && <span className="hidden sm:inline">🔥 </span>}Last {days}d
              </button>
            );
          })}
          <div className="text-lg sm:text-2xl flex-shrink-0">📅</div>
        </div>

        {/* TAB NAVIGATION - Mobile Optimized */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: "📈",
              color: "from-blue-500 to-cyan-500",
            },
            {
              id: "progress",
              label: "Journey",
              icon: "📚",
              color: "from-purple-500 to-pink-500",
            },
            {
              id: "achievements",
              label: "Badges",
              icon: "🏆",
              color: "from-yellow-500 to-orange-500",
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={
                  isActive
                    ? `relative px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all bg-gradient-to-r ${tab.color} text-white shadow-2xl whitespace-nowrap flex-shrink-0`
                    : "relative px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all bg-white/10 text-gray-300 backdrop-blur-sm whitespace-nowrap flex-shrink-0 active:scale-95"
                }
              >
                {isActive && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center animate-bounce text-xs sm:text-base">
                    ✨
                  </div>
                )}
                <span className="text-lg sm:text-2xl mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {overview && activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-8">
            {/* STATS CARDS - Mobile Optimized */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                {
                  icon: "📺",
                  label: "Watched",
                  value: overview.summary.totalVideosWatched,
                  desc: "videos",
                  color: "from-blue-500/30 to-cyan-500/30",
                  border: "blue-400/50",
                },
                {
                  icon: "⏱️",
                  label: "Time",
                  value: overview.summary.totalWatchTime,
                  desc: "minutes",
                  color: "from-green-500/30 to-emerald-500/30",
                  border: "green-400/50",
                },
                {
                  icon: "✅",
                  label: "Done",
                  value: overview.summary.completedVideos,
                  desc: "complete",
                  color: "from-purple-500/30 to-pink-500/30",
                  border: "purple-400/50",
                },
                {
                  icon: "📊",
                  label: "Rate",
                  value: `${overview.summary.averageCompletionRate}%`,
                  desc: "avg",
                  color: "from-yellow-500/30 to-orange-500/30",
                  border: "yellow-400/50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.color} backdrop-blur-lg p-3 sm:p-8 rounded-2xl sm:rounded-3xl border border-${stat.border} sm:border-2 shadow-2xl transform active:scale-95 sm:hover:scale-105 transition`}
                >
                  <div className="text-3xl sm:text-6xl mb-1 sm:mb-4 animate-bounce">
                    {stat.icon}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 mb-1 sm:mb-2 font-semibold uppercase">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-5xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-0.5 sm:mt-2">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* DAILY ACTIVITY - Mobile Optimized */}
            <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 sm:border-2 shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                <div className="text-2xl sm:text-4xl">📅</div>
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                  Daily Activity
                </h3>
                <div className="text-2xl sm:text-4xl">📈</div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {overview.dailyStats.map((day, index) => {
                  const percentage = Math.min(100, (day.watchTime / 60) * 100);
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="text-xs sm:text-sm font-semibold text-gray-300">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          {day.videosWatched} videos 🎬
                        </div>
                      </div>

                      <div className="relative bg-gray-800/50 rounded-full h-8 sm:h-12 overflow-hidden border border-purple-500/30">
                        <div
                          className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-full rounded-full flex items-center justify-end px-2 sm:px-4 transition-all duration-1000 group-hover:animate-pulse"
                          style={{ width: `${percentage}%` }}
                        >
                          {day.watchTime > 0 && (
                            <span className="text-white font-bold text-xs sm:text-sm drop-shadow-lg">
                              {day.watchTime}m 🔥
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOP CATEGORIES - Mobile Optimized */}
            <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 sm:border-2 shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                <div className="text-2xl sm:text-4xl">🎯</div>
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Top Categories
                </h3>
                <div className="text-2xl sm:text-4xl">🌟</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                {overview.topCategories.map((category, index) => {
                  const colors = [
                    "from-red-500 to-pink-500",
                    "from-blue-500 to-cyan-500",
                    "from-green-500 to-emerald-500",
                    "from-yellow-500 to-orange-500",
                    "from-purple-500 to-pink-500",
                  ];
                  return (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${
                        colors[index % colors.length]
                      } bg-opacity-20 backdrop-blur-lg p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 sm:border-2 shadow-xl transform active:scale-95 sm:hover:scale-105 transition`}
                    >
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="font-black text-base sm:text-xl text-white truncate flex-1">
                          {category.name}
                        </h4>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 ml-2">
                          <span className="text-base sm:text-2xl font-black">
                            #{index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                        <div className="bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                          <div className="text-lg sm:text-2xl font-bold">
                            {category.count}
                          </div>
                          <div className="text-xs text-white/80">Videos</div>
                        </div>
                        <div className="bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                          <div className="text-lg sm:text-2xl font-bold">
                            {category.totalTime}m
                          </div>
                          <div className="text-xs text-white/80">Time</div>
                        </div>
                        <div className="bg-black/20 rounded-lg sm:rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                          <div className="text-lg sm:text-2xl font-bold">
                            {category.completionRate}%
                          </div>
                          <div className="text-xs text-white/80">Done</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RECENT ACTIVITY - Mobile Optimized */}
            <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 sm:border-2 shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center">
                <div className="text-2xl sm:text-4xl">🕒</div>
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                  Recent Activity
                </h3>
                <div className="text-2xl sm:text-4xl">✨</div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {overview.recentVideos.length > 0 ? (
                  overview.recentVideos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 active:bg-white/10 transition transform active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2">
                            {video.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                            <span className="bg-purple-500/30 text-purple-200 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-semibold whitespace-nowrap">
                              📚 {video.category}
                            </span>
                            <span className="text-gray-300 whitespace-nowrap">
                              👁️ {video.watchCount}x
                            </span>
                            <span className="text-pink-300 whitespace-nowrap">
                              ❤️ {video.likes}
                            </span>
                            <span className="text-blue-300 hidden sm:inline whitespace-nowrap">
                              💬 {video.comments}
                            </span>
                            <span className="text-gray-400 whitespace-nowrap">
                              {new Date(video.lastWatchedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="text-center bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl border border-purple-400/30 sm:border-2 min-w-[60px] sm:min-w-[100px] flex-shrink-0">
                          <div className="text-xl sm:text-3xl font-black text-green-400">
                            {video.completionPercentage}%
                          </div>
                          <div className="text-xs text-purple-200 mt-0.5 sm:mt-1 hidden sm:block">
                            completed
                          </div>
                          <div className="text-base sm:text-xl mt-0.5 sm:mt-1">✅</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📺</div>
                    <p className="text-base sm:text-xl text-gray-400">
                      No completed videos yet!
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Videos appear here when watched to 90% or more
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === "progress" && selectedChild && (
          <WatchHistory childId={selectedChild} />
        )}

        {/* ACHIEVEMENTS TAB - Mobile Optimized */}
        {activeTab === "achievements" && achievements && (
          <div className="space-y-4 sm:space-y-8">
            {/* STREAKS - Mobile Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-xl p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-orange-400/50 shadow-2xl text-center transform active:scale-95 sm:hover:scale-105 sm:hover:rotate-1 transition">
                <div className="text-5xl sm:text-8xl mb-3 sm:mb-6 animate-bounce">🔥</div>
                <div className="text-4xl sm:text-7xl font-black mb-2 sm:mb-4 text-white drop-shadow-2xl">
                  {achievements.currentStreak}
                </div>
                <div className="text-lg sm:text-2xl font-bold text-orange-200 mb-1 sm:mb-2">
                  Day Streak
                </div>
                <div className="text-sm sm:text-lg text-orange-100">
                  Keep it burning! 🚀
                </div>
                {achievements.currentStreak >= 7 && (
                  <div className="mt-3 sm:mt-4 bg-yellow-400 text-purple-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold inline-block animate-pulse">
                    🎉 AMAZING! 🎉
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-yellow-500/30 to-amber-500/30 backdrop-blur-xl p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-yellow-400/50 shadow-2xl text-center transform active:scale-95 sm:hover:scale-105 sm:hover:rotate-1 transition">
                <div
                  className="text-5xl sm:text-8xl mb-3 sm:mb-6 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🏆
                </div>
                <div className="text-4xl sm:text-7xl font-black mb-2 sm:mb-4 text-white drop-shadow-2xl">
                  {achievements.longestStreak}
                </div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-200 mb-1 sm:mb-2">
                  Best Streak
                </div>
                <div className="text-sm sm:text-lg text-yellow-100">
                  Personal Record! 👑
                </div>
                {achievements.currentStreak === achievements.longestStreak &&
                  achievements.currentStreak > 0 && (
                    <div className="mt-3 sm:mt-4 bg-yellow-400 text-purple-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold inline-block animate-pulse">
                      🔥 AT PEAK! 🔥
                    </div>
                  )}
              </div>
            </div>

            {/* STATS OVERVIEW - Mobile Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-green-400/50 sm:border-2 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-green-200 text-xs sm:text-sm mb-1 sm:mb-2 font-semibold uppercase">
                      Completed
                    </div>
                    <div className="text-4xl sm:text-6xl font-black text-white">
                      {achievements.totalVideosCompleted}
                    </div>
                    <div className="text-green-200 text-xs sm:text-base mt-1 sm:mt-2">
                      Videos done! 🎬
                    </div>
                  </div>
                  <div className="text-4xl sm:text-7xl animate-bounce flex-shrink-0">✅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-blue-400/50 sm:border-2 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-blue-200 text-xs sm:text-sm mb-1 sm:mb-2 font-semibold uppercase">
                      Total Time
                    </div>
                    <div className="text-4xl sm:text-6xl font-black text-white">
                      {achievements.totalWatchTime}
                    </div>
                    <div className="text-blue-200 text-xs sm:text-base mt-1 sm:mt-2">
                      Minutes learned! ⏰
                    </div>
                  </div>
                  <div
                    className="text-4xl sm:text-7xl animate-bounce flex-shrink-0"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ⏱️
                  </div>
                </div>
              </div>
            </div>

            {/* BADGES - Mobile Optimized */}
            <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 sm:border-2 shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8 justify-center">
                <div className="text-3xl sm:text-5xl">🎖️</div>
                <h3 className="text-xl sm:text-3xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                  BADGES
                </h3>
                <div className="text-3xl sm:text-5xl">✨</div>
              </div>

              {achievements.badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {achievements.badges.map((badge, index) => {
                    const colors = [
                      "from-red-500 to-pink-600",
                      "from-blue-500 to-purple-600",
                      "from-green-500 to-emerald-600",
                      "from-yellow-500 to-orange-600",
                      "from-purple-500 to-pink-600",
                    ];
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${
                          colors[index % colors.length]
                        } backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white/30 shadow-2xl text-center transform active:scale-95 sm:hover:scale-110 sm:hover:rotate-3 transition cursor-pointer group`}
                      >
                        <div className="text-4xl sm:text-7xl mb-2 sm:mb-4 group-hover:animate-bounce">
                          {badge.icon}
                        </div>
                        <h4 className="font-black text-lg sm:text-2xl mb-2 sm:mb-3 text-white drop-shadow-lg">
                          {badge.name}
                        </h4>
                        <p className="text-white/90 text-sm sm:text-base font-semibold">
                          {badge.description}
                        </p>
                        <div className="mt-2 sm:mt-4 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full inline-block">
                          <span className="text-xs sm:text-sm font-bold">
                            🎉 UNLOCKED! 🎉
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-16">
                  <div className="text-5xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🎯</div>
                  <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">
                    No Badges Yet!
                  </h3>
                  <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-6">
                    Keep learning to unlock achievements! 🚀
                  </p>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full inline-block text-sm sm:text-base font-bold">
                    Start the journey! ✨
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
