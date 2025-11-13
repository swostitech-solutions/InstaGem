import React, { useState, useEffect } from "react";
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
  const { user } = useAuth();
  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [overview, setOverview] = useState<ChildOverview | null>(null);
  const [achievements, setAchievements] = useState<Achievement | null>(null);
  const [timeRange, setTimeRange] = useState<string>("7");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "progress" | "achievements"
  >("overview");

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 text-white overflow-x-hidden">
      {/* CRAZY ANIMATED HEADER */}
      <div className="bg-black/40 backdrop-blur-lg border-b-4 border-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl md:text-5xl animate-bounce">📊</div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
                  SUPER PARENT DASHBOARD
                </h1>
                <p className="text-yellow-300 text-sm md:text-base mt-1 font-semibold">
                  🌟 Track Your Child's Learning Adventure! 🚀
                </p>
              </div>
            </div>
            <a
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transform hover:scale-110 transition flex items-center gap-2"
            >
              ← Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* SUPER COOL CHILD SELECTOR */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="text-3xl">👶</div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              Your Amazing Kids
            </h2>
            <div className="text-3xl">🌈</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child) => (
              <button
                key={child._id}
                onClick={() => setSelectedChild(child._id)}
                className={
                  isSelected(child._id)
                    ? "group relative overflow-hidden rounded-2xl transition-all transform scale-105 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 shadow-2xl shadow-pink-500/50"
                    : "group relative overflow-hidden rounded-2xl transition-all transform hover:scale-105 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                }
              >
                {isSelected(child._id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 animate-pulse"></div>
                )}

                <div className="relative p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={child.avatarUrl}
                        alt={child.fullName}
                        className="w-16 h-16 rounded-full border-4 border-white/50 shadow-lg"
                      />
                      {isSelected(child._id) && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 rounded-full p-1">
                          ⭐
                        </div>
                      )}
                    </div>

                    <div className="text-left flex-1">
                      <h3 className="font-bold text-lg">{child.fullName}</h3>
                      <p
                        className={
                          isSelected(child._id)
                            ? "text-sm text-purple-100"
                            : "text-sm text-gray-300"
                        }
                      >
                        🎂 Age {child.age}
                      </p>
                    </div>

                    <div className="text-center bg-black/20 rounded-xl p-3 backdrop-blur-sm">
                      <div className="text-3xl font-black">
                        {child.stats.totalVideosWatched}
                      </div>
                      <div className="text-xs uppercase font-semibold">
                        videos
                      </div>
                    </div>
                  </div>

                  {isSelected(child._id) && (
                    <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold text-lg">
                          {child.stats.totalWatchTime}
                        </div>
                        <div className="text-purple-100">mins</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {child.stats.completedVideos}
                        </div>
                        <div className="text-purple-100">done</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">
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

        {/* TIME RANGE SELECTOR - SUPER FUN */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="text-2xl">⏰</div>
          {getTimeRangeButton("7")}
          {getTimeRangeButton("14")}
          {getTimeRangeButton("30")}
          <div className="text-2xl">📅</div>
        </div>

        {/* CRAZY TAB NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: "📈",
              color: "from-blue-500 to-cyan-500",
            },
            {
              id: "progress",
              label: "Learning Journey",
              icon: "📚",
              color: "from-purple-500 to-pink-500",
            },
            {
              id: "achievements",
              label: "Achievements",
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
                    ? `relative px-8 py-4 rounded-2xl font-bold text-lg transition-all transform scale-110 bg-gradient-to-r ${tab.color} text-white shadow-2xl`
                    : "relative px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-110 bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
                }
              >
                {isActive && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center animate-bounce">
                    ✨
                  </div>
                )}
                <span className="text-2xl mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {overview && activeTab === "overview" && (
          <div className="space-y-8">
            {/* MEGA STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "📺",
                  label: "Videos Watched",
                  value: overview.summary.totalVideosWatched,
                  desc: "Total amazing videos! 🎬",
                  color: "from-blue-500/30 to-cyan-500/30",
                  border: "blue-400/50",
                },
                {
                  icon: "⏱️",
                  label: "Watch Time",
                  value: overview.summary.totalWatchTime,
                  desc: "Minutes of learning! ⏰",
                  color: "from-green-500/30 to-emerald-500/30",
                  border: "green-400/50",
                },
                {
                  icon: "✅",
                  label: "Completed",
                  value: overview.summary.completedVideos,
                  desc: "Videos finished! 🎉",
                  color: "from-purple-500/30 to-pink-500/30",
                  border: "purple-400/50",
                },
                {
                  icon: "📊",
                  label: "Completion Rate",
                  value: `${overview.summary.averageCompletionRate}%`,
                  desc: "Average finish rate! 🎯",
                  color: "from-yellow-500/30 to-orange-500/30",
                  border: "yellow-400/50",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.color} backdrop-blur-lg p-8 rounded-3xl border-2 border-${stat.border} shadow-2xl transform hover:scale-105 transition`}
                >
                  <div className="text-6xl mb-4 animate-bounce">
                    {stat.icon}
                  </div>
                  <div className="text-sm text-white/80 mb-2 font-semibold uppercase">
                    {stat.label}
                  </div>
                  <div className="text-5xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 mt-2">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* DAILY ACTIVITY */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="text-4xl">📅</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                  Daily Learning Activity
                </h3>
                <div className="text-4xl">📈</div>
              </div>

              <div className="space-y-4">
                {overview.dailyStats.map((day, index) => {
                  const percentage = Math.min(100, (day.watchTime / 60) * 100);
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-300">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-gray-400">
                          {day.videosWatched} videos 🎬
                        </div>
                      </div>

                      <div className="relative bg-gray-800/50 rounded-full h-12 overflow-hidden border border-purple-500/30">
                        <div
                          className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-full rounded-full flex items-center justify-end px-4 transition-all duration-1000 group-hover:animate-pulse"
                          style={{ width: `${percentage}%` }}
                        >
                          {day.watchTime > 0 && (
                            <span className="text-white font-bold text-sm drop-shadow-lg">
                              {day.watchTime} min 🔥
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOP CATEGORIES */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="text-4xl">🎯</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                  Top Learning Categories
                </h3>
                <div className="text-4xl">🌟</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      } bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl border-2 border-white/20 shadow-xl transform hover:scale-105 transition`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-black text-xl text-white">
                          {category.name}
                        </h4>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-2xl font-black">
                            #{index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm">
                          <div className="text-2xl font-bold">
                            {category.count}
                          </div>
                          <div className="text-xs text-white/80">Videos</div>
                        </div>
                        <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm">
                          <div className="text-2xl font-bold">
                            {category.totalTime}m
                          </div>
                          <div className="text-xs text-white/80">Time</div>
                        </div>
                        <div className="bg-black/20 rounded-xl p-3 backdrop-blur-sm">
                          <div className="text-2xl font-bold">
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

            {/* RECENT ACTIVITY */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="text-4xl">🕒</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                  Recent Learning Activity
                </h3>
                <div className="text-4xl">✨</div>
              </div>

              <div className="space-y-4">
                {overview.recentVideos.length > 0 ? (
                  overview.recentVideos.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <h4 className="font-bold text-lg mb-2">
                            {video.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full font-semibold">
                              📚 {video.category}
                            </span>
                            <span className="text-gray-300">
                              👁️ Watched {video.watchCount}x
                            </span>
                            <span className="text-pink-300">
                              ❤️ {video.likes} likes
                            </span>
                            <span className="text-blue-300">
                              💬 {video.comments} comments
                            </span>
                            <span className="text-gray-400">
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

                        <div className="text-center bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm p-4 rounded-xl border-2 border-purple-400/30 min-w-[100px]">
                          <div className="text-3xl font-black text-green-400">
                            {video.completionPercentage}%
                          </div>
                          <div className="text-xs text-purple-200 mt-1">
                            completed
                          </div>
                          <div className="text-xl mt-1">✅</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📺</div>
                    <p className="text-xl text-gray-400">
                      No completed videos yet!
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
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

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && achievements && (
          <div className="space-y-8">
            {/* STREAKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-xl p-10 rounded-3xl border-4 border-orange-400/50 shadow-2xl text-center transform hover:scale-105 hover:rotate-1 transition">
                <div className="text-8xl mb-6 animate-bounce">🔥</div>
                <div className="text-7xl font-black mb-4 text-white drop-shadow-2xl">
                  {achievements.currentStreak}
                </div>
                <div className="text-2xl font-bold text-orange-200 mb-2">
                  Day Streak
                </div>
                <div className="text-lg text-orange-100">
                  Keep the fire burning! 🚀
                </div>
                {achievements.currentStreak >= 7 && (
                  <div className="mt-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold inline-block animate-pulse">
                    🎉 AMAZING STREAK! 🎉
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-yellow-500/30 to-amber-500/30 backdrop-blur-xl p-10 rounded-3xl border-4 border-yellow-400/50 shadow-2xl text-center transform hover:scale-105 hover:rotate-1 transition">
                <div
                  className="text-8xl mb-6 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🏆
                </div>
                <div className="text-7xl font-black mb-4 text-white drop-shadow-2xl">
                  {achievements.longestStreak}
                </div>
                <div className="text-2xl font-bold text-yellow-200 mb-2">
                  Longest Streak
                </div>
                <div className="text-lg text-yellow-100">
                  Personal Best Record! 👑
                </div>
                {achievements.currentStreak === achievements.longestStreak &&
                  achievements.currentStreak > 0 && (
                    <div className="mt-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold inline-block animate-pulse">
                      🔥 AT PEAK PERFORMANCE! 🔥
                    </div>
                  )}
              </div>
            </div>

            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-400/50 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-200 text-sm mb-2 font-semibold uppercase">
                      Videos Completed
                    </div>
                    <div className="text-6xl font-black text-white">
                      {achievements.totalVideosCompleted}
                    </div>
                    <div className="text-green-200 mt-2">
                      Videos fully finished! 🎬
                    </div>
                  </div>
                  <div className="text-7xl animate-bounce">✅</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-400/50 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-blue-200 text-sm mb-2 font-semibold uppercase">
                      Total Learning Time
                    </div>
                    <div className="text-6xl font-black text-white">
                      {achievements.totalWatchTime}
                    </div>
                    <div className="text-blue-200 mt-2">
                      Minutes of knowledge! ⏰
                    </div>
                  </div>
                  <div
                    className="text-7xl animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ⏱️
                  </div>
                </div>
              </div>
            </div>

            {/* BADGES */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="text-5xl">🎖️</div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                  EARNED BADGES
                </h3>
                <div className="text-5xl">✨</div>
              </div>

              {achievements.badges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        } backdrop-blur-xl p-8 rounded-3xl border-4 border-white/30 shadow-2xl text-center transform hover:scale-110 hover:rotate-3 transition cursor-pointer group`}
                      >
                        <div className="text-7xl mb-4 group-hover:animate-bounce">
                          {badge.icon}
                        </div>
                        <h4 className="font-black text-2xl mb-3 text-white drop-shadow-lg">
                          {badge.name}
                        </h4>
                        <p className="text-white/90 font-semibold">
                          {badge.description}
                        </p>
                        <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                          <span className="text-sm font-bold">
                            🎉 UNLOCKED! 🎉
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6 animate-bounce">🎯</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    No Badges Yet!
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">
                    Keep learning to unlock awesome achievements! 🚀
                  </p>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full inline-block font-bold">
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
