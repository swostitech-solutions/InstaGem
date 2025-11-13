import React, { useEffect, useState } from "react";
import * as feedbackAPI from "../api/feedbackAPI";
import { useAuth } from "../context/AuthContext";

export const GamificationWidget: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !isAuthenticated) return;

      try {
        const response = await feedbackAPI.getUserGamification((user as any)._id);
        setStats(response);
      } catch (error) {
        console.error("Error fetching gamification stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, isAuthenticated]);

  if (!isAuthenticated || loading || !stats) return null;

  const { gamification, stats: progressStats } = stats;

  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">{gamification.title}</h3>
          <p className="text-white/80 text-sm">Level {gamification.currentLevel}</p>
        </div>
        <div className="text-4xl">👑</div>
      </div>

      {/* Points & Level Progress */}
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Level Progress</span>
          <span className="text-yellow-300 font-bold">{gamification.totalPoints} 💎</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressStats.progressToNextLevel}%` }}
          />
        </div>
        <div className="text-sm text-white/80 mt-1">
          {progressStats.pointsToNextLevel} points to Level {progressStats.nextLevel}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {gamification.videosCompleted}
          </div>
          <div className="text-xs opacity-90">Videos Watched</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-orange-300">
            {gamification.currentStreak} 🔥
          </div>
          <div className="text-xs opacity-90">Day Streak</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-green-300">
            {gamification.feedbackGiven}
          </div>
          <div className="text-xs opacity-90">Feedback Given</div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-purple-300">
            {gamification.badges.length} 🏆
          </div>
          <div className="text-xs opacity-90">Badges Earned</div>
        </div>
      </div>

      {/* Recent Badges */}
      {gamification.badges.length > 0 && (
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
          <div className="text-sm font-semibold mb-2">Latest Badges</div>
          <div className="flex gap-2 overflow-x-auto">
            {gamification.badges.slice(-5).reverse().map((badge: any, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white/30 rounded-lg p-2 text-center min-w-[60px]"
                title={badge.description}
              >
                <div className="text-2xl">{badge.icon}</div>
                <div className="text-[10px] mt-1 opacity-90 truncate">
                  {badge.badgeName.split(' ')[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
