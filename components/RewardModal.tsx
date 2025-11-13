import React, { useEffect, useState } from "react";

interface RewardModalProps {
  rewards: {
    pointsEarned: number;
    totalPoints: number;
    currentLevel: number;
    leveledUp: boolean;
    newBadges: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      points: number;
    }>;
    currentStreak: number;
    title: string;
  };
  onClose: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({ rewards, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
    if (rewards.newBadges.length > 0) {
      setTimeout(() => setShowBadges(true), 1000);
    }
  }, [rewards.newBadges.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      {/* Epic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
          >
            {["✨", "🌟", "💫", "⭐", "🎯", "🏆", "💎"][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      <div className="relative max-w-lg w-full">
        {/* Main Reward Card */}
        <div className={`bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl p-8 text-white transform transition-all duration-700 ${
          showContent ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-2xl transition-all"
          >
            ×
          </button>

          {/* Main Content */}
          <div className="text-center space-y-6">
            {/* Epic Title */}
            <div className="space-y-2">
              <div className="text-7xl animate-bounce">
                {rewards.leveledUp ? "🚀" : "🎉"}
              </div>
              <h2 className="text-4xl font-black">
                {rewards.leveledUp ? "LEVEL UP!" : "AMAZING!"}
              </h2>
            </div>

            {/* Points Earned */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all">
              <div className="text-6xl font-black text-yellow-300 animate-pulse">
                +{rewards.pointsEarned}
              </div>
              <div className="text-xl font-bold mt-2">Points Earned!</div>
            </div>

            {/* Level & Total Points */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-300">
                  {rewards.currentLevel}
                </div>
                <div className="text-sm">Current Level</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-green-300">
                  {rewards.totalPoints}
                </div>
                <div className="text-sm">Total Points</div>
              </div>
            </div>

            {/* Title */}
            {rewards.leveledUp && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 transform animate-pulse">
                <div className="text-sm opacity-80">New Title Unlocked!</div>
                <div className="text-2xl font-bold mt-1">{rewards.title}</div>
              </div>
            )}

            {/* Streak */}
            {rewards.currentStreak > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <span className="text-2xl font-bold">{rewards.currentStreak} Day Streak!</span>
                </div>
                <div className="text-sm opacity-80 mt-1">
                  Keep it up! Come back tomorrow!
                </div>
              </div>
            )}

            {/* New Badges */}
            {rewards.newBadges.length > 0 && showBadges && (
              <div className="space-y-4 animate-slideInUp">
                <div className="text-2xl font-bold">🏆 New Badges Unlocked!</div>
                <div className="space-y-3">
                  {rewards.newBadges.map((badge, index) => (
                    <div
                      key={badge.id}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 transform hover:scale-105 transition-all"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{badge.icon}</div>
                        <div className="text-left flex-1">
                          <div className="font-bold text-lg">{badge.name}</div>
                          <div className="text-sm opacity-90">{badge.description}</div>
                        </div>
                        <div className="bg-white/30 rounded-full px-3 py-1 text-sm font-bold">
                          +{badge.points}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={onClose}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-2xl mt-6"
            >
              {rewards.leveledUp ? "🎮 Continue Learning!" : "🚀 Keep Going!"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
      `}</style>
    </div>
  );
};
