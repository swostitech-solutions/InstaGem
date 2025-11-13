import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface VideoFeedbackModalProps {
  videoId: string;
  videoTitle: string;
  completionPercentage: number;
  onClose: () => void;
  onSubmit: (feedbackData: any) => void;
}

const EMOJI_OPTIONS = [
  { id: "loved", emoji: "😍", label: "LOVED IT!", color: "from-pink-500 to-red-500", points: "+25" },
  { id: "good", emoji: "😊", label: "Pretty Good", color: "from-green-500 to-emerald-500", points: "+20" },
  { id: "okay", emoji: "😐", label: "Just OK", color: "from-yellow-500 to-orange-500", points: "+15" },
  { id: "meh", emoji: "😕", label: "Meh...", color: "from-gray-500 to-gray-600", points: "+10" },
  { id: "boring", emoji: "😴", label: "Boring", color: "from-blue-500 to-purple-500", points: "+5" },
];

const TOPIC_OPTIONS = [
  { id: "science", emoji: "🧪", label: "Science" },
  { id: "math", emoji: "🔢", label: "Math" },
  { id: "art", emoji: "🎨", label: "Art" },
  { id: "music", emoji: "🎵", label: "Music" },
  { id: "language", emoji: "📚", label: "Language" },
  { id: "culture", emoji: "🌍", label: "Culture" },
  { id: "nature", emoji: "🌿", label: "Nature" },
  { id: "technology", emoji: "💻", label: "Technology" },
  { id: "sports", emoji: "⚽", label: "Sports" },
  { id: "creativity", emoji: "💡", label: "Creativity" },
  { id: "problem-solving", emoji: "🧩", label: "Problem Solving" },
  { id: "fun-facts", emoji: "🤓", label: "Fun Facts" },
];

export const VideoFeedbackModal: React.FC<VideoFeedbackModalProps> = ({
  videoId,
  videoTitle,
  completionPercentage,
  onClose,
  onSubmit,
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<"stars" | "emoji" | "topics" | "comment">("stars");
  const [starRating, setStarRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [emojiRating, setEmojiRating] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Play celebration sound/animation when modal opens
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleStarClick = (rating: number) => {
    setStarRating(rating);
    setTimeout(() => setStep("emoji"), 300);
  };

  const handleEmojiClick = (emojiId: string) => {
    setEmojiRating(emojiId);
    setTimeout(() => setStep("topics"), 300);
  };

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSkipTopics = () => {
    setStep("comment");
  };

  const handleSubmit = () => {
    const responseTime = Math.floor((Date.now() - startTime) / 1000);
    
    const feedbackData = {
      starRating,
      emojiRating,
      topicsLearned: selectedTopics,
      comment: comment.trim(),
      completionPercentage,
      responseTime,
    };

    onSubmit(feedbackData);
  };

  const getStarLabel = (rating: number) => {
    const labels = ["", "😢 Not Good", "😐 Could Be Better", "😊 Good", "😍 Great", "🌟 AMAZING!"];
    return labels[rating];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 15}px`,
              }}
            >
              {["🎉", "⭐", "🎊", "✨", "🌟", "💫", "🎈"][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 rounded-3xl shadow-2xl max-w-md w-full p-8 text-white relative transform animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Awesome Job, {user?.username || "Champ"}!
          </h2>
          <p className="text-white/80">You watched the whole video! 🎥✨</p>
        </div>

        {/* Step 1: Star Rating */}
        {step === "stars" && (
          <div className="space-y-6 animate-slideInUp">
            <h3 className="text-2xl font-bold text-center mb-6">
              Rate this video! ⭐
            </h3>
            
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transform transition-all duration-200 hover:scale-125 focus:outline-none"
                >
                  <div className={`text-6xl transition-all ${
                    star <= (hoveredStar || starRating)
                      ? "filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] scale-110"
                      : "opacity-30"
                  }`}>
                    {star <= (hoveredStar || starRating) ? "⭐" : "☆"}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center text-xl font-bold text-yellow-300 min-h-[30px]">
              {getStarLabel(hoveredStar || starRating)}
            </div>
          </div>
        )}

        {/* Step 2: Emoji Feeling */}
        {step === "emoji" && (
          <div className="space-y-6 animate-slideInUp">
            <h3 className="text-2xl font-bold text-center mb-6">
              How did you feel? 😊
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {EMOJI_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleEmojiClick(option.id)}
                  className={`relative p-4 rounded-2xl bg-gradient-to-br ${option.color} hover:scale-105 transform transition-all duration-200 group`}
                >
                  <div className="text-5xl mb-2 group-hover:animate-bounce">
                    {option.emoji}
                  </div>
                  <div className="font-bold text-sm">{option.label}</div>
                  <div className="absolute top-2 right-2 bg-white/20 rounded-full px-2 py-1 text-xs font-bold">
                    {option.points}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Topics Learned */}
        {step === "topics" && (
          <div className="space-y-6 animate-slideInUp">
            <h3 className="text-2xl font-bold text-center mb-4">
              What did you learn? 🎓
            </h3>
            <p className="text-center text-white/70 text-sm mb-4">
              (Tap all that apply - +2 points each!)
            </p>
            
            <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
              {TOPIC_OPTIONS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicToggle(topic.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedTopics.includes(topic.id)
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 border-white scale-105"
                      : "bg-white/10 border-white/30 hover:border-white/60"
                  }`}
                >
                  <div className={`text-3xl mb-1 ${selectedTopics.includes(topic.id) ? "animate-bounce" : ""}`}>
                    {topic.emoji}
                  </div>
                  <div className="text-xs font-semibold">{topic.label}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkipTopics}
                className="flex-1 py-3 px-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Skip
              </button>
              <button
                onClick={() => setStep("comment")}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Optional Comment */}
        {step === "comment" && (
          <div className="space-y-6 animate-slideInUp">
            <h3 className="text-2xl font-bold text-center mb-4">
              Anything else? 💭
            </h3>
            <p className="text-center text-white/70 text-sm mb-4">
              (Optional - +10 bonus points for thoughtful feedback!)
            </p>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you thought..."
              className="w-full p-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-white/50 focus:border-white/60 focus:outline-none resize-none"
              rows={4}
              maxLength={500}
            />
            
            <div className="text-right text-sm text-white/60">
              {comment.length}/500
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 px-6 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl animate-pulse"
              >
                🎁 Get Reward!
              </button>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {["stars", "emoji", "topics", "comment"].map((s, i) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-gradient-to-r from-yellow-400 to-pink-500"
                  : ["stars", "emoji", "topics", "comment"].indexOf(step) > i
                  ? "w-2 bg-green-500"
                  : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out; }
        .animate-confetti { animation: confetti 3s linear forwards; }
      `}</style>
    </div>
  );
};
