import express from 'express';
import VideoFeedback from '../models/VideoFeedback.js';
import Video from '../models/Video.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Badge definitions - SUPER EPIC!
const BADGES = {
  FIRST_FEEDBACK: {
    id: 'first_feedback',
    name: '🎯 First Feedback',
    description: 'Gave your first video feedback!',
    icon: '🎯',
    points: 50
  },
  FEEDBACK_MASTER: {
    id: 'feedback_master',
    name: '💎 Feedback Master',
    description: 'Gave feedback on 25 videos!',
    icon: '💎',
    points: 500
  },
  FIVE_STAR_FAN: {
    id: 'five_star_fan',
    name: '⭐ Five Star Fan',
    description: 'Gave 10 videos 5-star ratings!',
    icon: '⭐',
    points: 200
  },
  WEEKLY_WARRIOR: {
    id: 'weekly_warrior',
    name: '🔥 Weekly Warrior',
    description: '7-day learning streak!',
    icon: '🔥',
    points: 300
  },
  CATEGORY_CHAMPION: {
    id: 'category_champion',
    name: '🏆 Category Champion',
    description: 'Mastered a category!',
    icon: '🏆',
    points: 400
  },
  SPEED_LEARNER: {
    id: 'speed_learner',
    name: '⚡ Speed Learner',
    description: 'Completed 5 videos in one day!',
    icon: '⚡',
    points: 250
  },
  CURIOUS_MIND: {
    id: 'curious_mind',
    name: '🧠 Curious Mind',
    description: 'Watched videos from 5 different categories!',
    icon: '🧠',
    points: 350
  },
  SUPER_LEARNER: {
    id: 'super_learner',
    name: '🌟 Super Learner',
    description: 'Reached Level 10!',
    icon: '🌟',
    points: 1000
  },
  HUNDRED_CLUB: {
    id: 'hundred_club',
    name: '💯 Hundred Club',
    description: 'Completed 100 videos!',
    icon: '💯',
    points: 800
  },
  DEDICATION_STAR: {
    id: 'dedication_star',
    name: '🎖️ Dedication Star',
    description: '30-day learning streak!',
    icon: '🎖️',
    points: 1500
  }
};

// Calculate level from points
const calculateLevel = (points) => {
  return Math.floor(Math.sqrt(points / 100)) + 1;
};

// Get title based on level
const getTitle = (level) => {
  if (level >= 50) return '🌌 Cosmic Master';
  if (level >= 40) return '🚀 Space Explorer';
  if (level >= 30) return '👑 Learning Royalty';
  if (level >= 25) return '🦸 Super Genius';
  if (level >= 20) return '🎓 Scholar Supreme';
  if (level >= 15) return '🌟 Rising Star';
  if (level >= 10) return '💎 Diamond Mind';
  if (level >= 7) return '🏆 Champion Learner';
  if (level >= 5) return '⚡ Quick Thinker';
  if (level >= 3) return '🌱 Growing Mind';
  return '🎯 Beginner Explorer';
};

// Check for badge unlocks
const checkBadgeUnlocks = async (user, feedback) => {
  const unlockedBadges = [];
  const userBadgeIds = user.gamification.badges.map(b => b.badgeId);

  // First Feedback
  if (!userBadgeIds.includes('first_feedback') && user.gamification.feedbackGiven === 1) {
    unlockedBadges.push(BADGES.FIRST_FEEDBACK);
  }

  // Feedback Master - 25 feedbacks
  if (!userBadgeIds.includes('feedback_master') && user.gamification.feedbackGiven >= 25) {
    unlockedBadges.push(BADGES.FEEDBACK_MASTER);
  }

  // Five Star Fan - Check how many 5-star ratings
  if (!userBadgeIds.includes('five_star_fan')) {
    const fiveStarCount = await VideoFeedback.countDocuments({
      user: user._id,
      starRating: 5
    });
    if (fiveStarCount >= 10) {
      unlockedBadges.push(BADGES.FIVE_STAR_FAN);
    }
  }

  // Weekly Warrior - 7 day streak
  if (!userBadgeIds.includes('weekly_warrior') && user.gamification.currentStreak >= 7) {
    unlockedBadges.push(BADGES.WEEKLY_WARRIOR);
  }

  // Dedication Star - 30 day streak
  if (!userBadgeIds.includes('dedication_star') && user.gamification.currentStreak >= 30) {
    unlockedBadges.push(BADGES.DEDICATION_STAR);
  }

  // Hundred Club - 100 videos completed
  if (!userBadgeIds.includes('hundred_club') && user.gamification.videosCompleted >= 100) {
    unlockedBadges.push(BADGES.HUNDRED_CLUB);
  }

  // Super Learner - Level 10
  if (!userBadgeIds.includes('super_learner') && user.gamification.currentLevel >= 10) {
    unlockedBadges.push(BADGES.SUPER_LEARNER);
  }

  return unlockedBadges;
};

// @desc    Submit video feedback
// @route   POST /api/feedback/video/:videoId
// @access  Private
router.post('/video/:videoId', protect, async (req, res) => {
  try {
    const { videoId } = req.params;
    const {
      starRating,
      emojiRating,
      topicsLearned,
      comment,
      completionPercentage,
      responseTime
    } = req.body;

    // Validate video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user already gave feedback for this video
    const existingFeedback = await VideoFeedback.findOne({
      video: videoId,
      user: req.user._id
    });

    if (existingFeedback) {
      return res.status(400).json({ message: 'You already gave feedback for this video' });
    }

    // Calculate points earned
    let pointsEarned = 15; // Base points for feedback
    if (starRating === 5) pointsEarned += 10; // Bonus for 5 stars
    if (emojiRating === 'loved') pointsEarned += 5; // Bonus for loving it
    if (topicsLearned && topicsLearned.length > 0) pointsEarned += topicsLearned.length * 2; // Bonus for selecting topics
    if (comment && comment.trim().length > 10) pointsEarned += 10; // Bonus for detailed feedback
    if (completionPercentage >= 90) pointsEarned += 10; // Bonus for completing video

    // Create feedback
    const feedback = await VideoFeedback.create({
      video: videoId,
      user: req.user._id,
      starRating,
      emojiRating,
      topicsLearned: topicsLearned || [],
      comment: comment || '',
      completionPercentage,
      responseTime: responseTime || 0,
      pointsEarned,
      ageGroup: video.ageGroup,
      triggeredAchievements: []
    });

    // Update user gamification stats
    const user = await User.findById(req.user._id);
    
    // Update streak
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActivity = new Date(user.gamification.lastActivityDate).setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      user.gamification.currentStreak += 1;
      user.gamification.longestStreak = Math.max(
        user.gamification.longestStreak,
        user.gamification.currentStreak
      );
    } else if (daysDiff > 1) {
      user.gamification.currentStreak = 1;
    }

    user.gamification.lastActivityDate = new Date();
    user.gamification.totalPoints += pointsEarned;
    user.gamification.feedbackGiven += 1;
    
    // Update level
    const newLevel = calculateLevel(user.gamification.totalPoints);
    const leveledUp = newLevel > user.gamification.currentLevel;
    user.gamification.currentLevel = newLevel;
    user.gamification.title = getTitle(newLevel);

    // Check for badge unlocks
    const unlockedBadges = await checkBadgeUnlocks(user, feedback);
    
    // Add badges to user and feedback
    for (const badge of unlockedBadges) {
      user.gamification.badges.push({
        badgeId: badge.id,
        badgeName: badge.name,
        description: badge.description,
        icon: badge.icon,
        unlockedAt: new Date()
      });
      
      user.gamification.totalPoints += badge.points;
      
      feedback.triggeredAchievements.push({
        badgeId: badge.id,
        badgeName: badge.name,
        pointsAwarded: badge.points
      });
    }

    await user.save();
    await feedback.save();

    res.status(201).json({
      success: true,
      feedback,
      rewards: {
        pointsEarned,
        totalPoints: user.gamification.totalPoints,
        currentLevel: user.gamification.currentLevel,
        leveledUp,
        newBadges: unlockedBadges,
        currentStreak: user.gamification.currentStreak,
        title: user.gamification.title
      }
    });

  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// @desc    Get user gamification stats
// @route   GET /api/feedback/gamification/:userId
// @access  Private
router.get('/gamification/:userId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized (self or admin)
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this data' });
    }

    // Get recent feedback
    const recentFeedback = await VideoFeedback.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('video', 'title category thumbnailUrl');

    // Calculate points to next level
    const currentLevelPoints = (user.gamification.currentLevel - 1) ** 2 * 100;
    const nextLevelPoints = user.gamification.currentLevel ** 2 * 100;
    const progressToNextLevel = ((user.gamification.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints) * 100).toFixed(1);

    res.json({
      success: true,
      gamification: user.gamification,
      stats: {
        progressToNextLevel: parseFloat(progressToNextLevel),
        pointsToNextLevel: nextLevelPoints - user.gamification.totalPoints,
        nextLevel: user.gamification.currentLevel + 1,
        nextTitle: getTitle(user.gamification.currentLevel + 1)
      },
      recentFeedback
    });

  } catch (error) {
    console.error('Get gamification error:', error);
    res.status(500).json({ message: 'Error fetching gamification data', error: error.message });
  }
});

// @desc    Get all available badges
// @route   GET /api/feedback/badges
// @access  Public
router.get('/badges', async (req, res) => {
  try {
    res.json({
      success: true,
      badges: Object.values(BADGES)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching badges', error: error.message });
  }
});

// @desc    Get feedback analytics (Admin only)
// @route   GET /api/feedback/analytics
// @access  Private/Admin
router.get('/analytics', protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { videoId, startDate, endDate, ageGroup } = req.query;

    // Build query
    const query = {};
    if (videoId) query.video = videoId;
    if (ageGroup) query.ageGroup = ageGroup;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Get all feedback
    const allFeedback = await VideoFeedback.find(query).populate('video', 'title category ageGroup');

    // Calculate metrics
    const totalFeedback = allFeedback.length;
    const avgStarRating = totalFeedback > 0
      ? (allFeedback.reduce((sum, f) => sum + f.starRating, 0) / totalFeedback).toFixed(2)
      : 0;

    // Emoji sentiment breakdown
    const emojiBreakdown = {
      loved: allFeedback.filter(f => f.emojiRating === 'loved').length,
      good: allFeedback.filter(f => f.emojiRating === 'good').length,
      okay: allFeedback.filter(f => f.emojiRating === 'okay').length,
      meh: allFeedback.filter(f => f.emojiRating === 'meh').length,
      boring: allFeedback.filter(f => f.emojiRating === 'boring').length
    };

    // Top rated videos
    const videoRatings = {};
    allFeedback.forEach(f => {
      if (f.video) {
        const videoId = f.video._id.toString();
        if (!videoRatings[videoId]) {
          videoRatings[videoId] = {
            video: f.video,
            ratings: [],
            count: 0
          };
        }
        videoRatings[videoId].ratings.push(f.starRating);
        videoRatings[videoId].count++;
      }
    });

    const topRatedVideos = Object.values(videoRatings)
      .map(v => ({
        video: v.video,
        avgRating: (v.ratings.reduce((a, b) => a + b, 0) / v.count).toFixed(2),
        feedbackCount: v.count
      }))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);

    // Videos needing improvement
    const needsImprovement = Object.values(videoRatings)
      .map(v => ({
        video: v.video,
        avgRating: (v.ratings.reduce((a, b) => a + b, 0) / v.count).toFixed(2),
        feedbackCount: v.count
      }))
      .filter(v => v.avgRating < 3)
      .sort((a, b) => a.avgRating - b.avgRating)
      .slice(0, 10);

    // Topics learned distribution
    const topicsCount = {};
    allFeedback.forEach(f => {
      f.topicsLearned.forEach(topic => {
        topicsCount[topic] = (topicsCount[topic] || 0) + 1;
      });
    });

    res.json({
      success: true,
      analytics: {
        totalFeedback,
        avgStarRating: parseFloat(avgStarRating),
        emojiBreakdown,
        topRatedVideos,
        needsImprovement,
        topicsLearned: topicsCount
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

export default router;
