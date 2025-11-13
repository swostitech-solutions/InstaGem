import express from 'express';
const router = express.Router();
import WatchHistory from '../models/WatchHistory.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import { protect } from '../middleware/auth.js';

// Middleware to verify parent/teacher access to child data
const verifyParentAccess = async (req, res, next) => {
  try {
    const { childId } = req.params;
    const child = await User.findById(childId);
    
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Check access:
    // 1. If user is admin, allow
    // 2. If childId matches req.user._id (viewing own data), allow
    // 3. If req.user has same parentEmail as child (siblings), allow
    // 4. If req.user.email matches child.parentEmail (parent viewing), allow
    const isAdmin = req.user.isAdmin;
    const isSelf = child._id.toString() === req.user._id.toString();
    const isSibling = req.user.parentEmail && req.user.parentEmail === child.parentEmail;
    const isParent = child.parentEmail && req.user.parentEmail === child.parentEmail;
    
    if (!isAdmin && !isSelf && !isSibling && !isParent) {
      return res.status(403).json({ 
        message: 'Not authorized to view this child\'s data',
        debug: {
          childId: child._id,
          userId: req.user._id,
          childParentEmail: child.parentEmail,
          userParentEmail: req.user.parentEmail
        }
      });
    }

    req.child = child;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying access', error: error.message });
  }
};

// @desc    Track video watch progress
// @route   POST /api/analytics/watch
// @access  Private
router.post('/watch', protect, async (req, res) => {
  try {
    const { videoId, watchedDuration, totalDuration } = req.body;

    if (!videoId || watchedDuration === undefined || !totalDuration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find existing watch history or create new
    let watchHistory = await WatchHistory.findOne({
      user: req.user._id,
      video: videoId
    });

    if (watchHistory) {
      // Update existing record
      watchHistory.watchedDuration = Math.max(watchHistory.watchedDuration, watchedDuration);
      watchHistory.totalDuration = totalDuration;
      watchHistory.lastWatchedAt = new Date();
      watchHistory.watchCount += 1;
    } else {
      // Create new record
      watchHistory = new WatchHistory({
        user: req.user._id,
        video: videoId,
        watchedDuration,
        totalDuration
      });
    }

    await watchHistory.save();

    res.json({
      success: true,
      data: watchHistory
    });
  } catch (error) {
    console.error('Track watch error:', error);
    res.status(500).json({ message: 'Error tracking watch progress', error: error.message });
  }
});

// @desc    Get child's watch history
// @route   GET /api/analytics/child/:childId/history
// @access  Private (Parent/Teacher)
router.get('/child/:childId/history', protect, verifyParentAccess, async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;

    const watchHistory = await WatchHistory.find({ user: req.child._id })
      .populate('video', 'title thumbnailUrl ageGroup category')
      .sort({ lastWatchedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WatchHistory.countDocuments({ user: req.child._id });

    res.json({
      success: true,
      data: watchHistory,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Error fetching watch history', error: error.message });
  }
});

// @desc    Get child's learning analytics
// @route   GET /api/analytics/child/:childId/overview
// @access  Private (Parent/Teacher)
router.get('/child/:childId/overview', protect, verifyParentAccess, async (req, res) => {
  try {
    const { timeRange = '7' } = req.query; // days
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(timeRange));

    // Get all watch history for time range
    const watchHistory = await WatchHistory.find({
      user: req.child._id,
      lastWatchedAt: { $gte: daysAgo }
    }).populate('video', 'title ageGroup category');

    // Calculate statistics
    const totalVideosWatched = watchHistory.length;
    const totalWatchTime = watchHistory.reduce((sum, item) => sum + item.watchedDuration, 0);
    const completedVideos = watchHistory.filter(item => item.isCompleted).length;
    const averageCompletionRate = totalVideosWatched > 0
      ? (watchHistory.reduce((sum, item) => sum + item.completionPercentage, 0) / totalVideosWatched).toFixed(1)
      : 0;

    // Category breakdown
    const categoryStats = {};
    watchHistory.forEach(item => {
      if (item.video && item.video.category) {
        const category = item.video.category;
        if (!categoryStats[category]) {
          categoryStats[category] = {
            count: 0,
            totalTime: 0,
            completed: 0
          };
        }
        categoryStats[category].count += 1;
        categoryStats[category].totalTime += item.watchedDuration;
        if (item.isCompleted) categoryStats[category].completed += 1;
      }
    });

    // Daily watch time (last 7 days)
    const dailyStats = [];
    for (let i = parseInt(timeRange) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayHistory = watchHistory.filter(item => {
        const watchDate = new Date(item.lastWatchedAt);
        return watchDate >= date && watchDate < nextDate;
      });

      const dayTime = dayHistory.reduce((sum, item) => sum + item.watchedDuration, 0);

      dailyStats.push({
        date: date.toISOString().split('T')[0],
        watchTime: Math.round(dayTime / 60), // minutes
        videosWatched: dayHistory.length
      });
    }

    // Most watched categories
    const topCategories = Object.entries(categoryStats)
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        totalTime: Math.round(stats.totalTime / 60), // minutes
        completionRate: stats.count > 0 ? ((stats.completed / stats.count) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recently watched videos (only completed ones ≥90%)
    const completedWatchHistory = watchHistory.filter(item => item.isCompleted);
    
    const recentVideos = await Promise.all(
      completedWatchHistory
        .sort((a, b) => new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt))
        .slice(0, 5)
        .map(async (item) => {
          const video = await Video.findById(item.video._id);
          return {
            videoId: item.video._id,
            title: item.video.title,
            category: item.video.category,
            completionPercentage: item.completionPercentage,
            lastWatchedAt: item.lastWatchedAt,
            watchCount: item.watchCount,
            likes: video ? video.likes.length : 0,
            comments: video ? video.comments.length : 0
          };
        })
    );

    res.json({
      success: true,
      data: {
        childInfo: {
          name: req.child.fullName,
          age: req.child.childAge,
          username: req.child.username
        },
        summary: {
          totalVideosWatched,
          totalWatchTime: Math.round(totalWatchTime / 60), // minutes
          completedVideos,
          averageCompletionRate: parseFloat(averageCompletionRate),
          averageDailyTime: Math.round(totalWatchTime / 60 / parseInt(timeRange)) // minutes per day
        },
        dailyStats,
        topCategories,
        recentVideos,
        timeRange: parseInt(timeRange)
      }
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({ message: 'Error fetching analytics overview', error: error.message });
  }
});

// @desc    Get detailed video analytics
// @route   GET /api/analytics/child/:childId/video/:videoId
// @access  Private (Parent/Teacher)
router.get('/child/:childId/video/:videoId', protect, verifyParentAccess, async (req, res) => {
  try {
    const { videoId } = req.params;

    const watchHistory = await WatchHistory.findOne({
      user: req.child._id,
      video: videoId
    }).populate('video', 'title description thumbnailUrl ageGroup category');

    if (!watchHistory) {
      return res.status(404).json({ message: 'No watch history found for this video' });
    }

    res.json({
      success: true,
      data: {
        video: watchHistory.video,
        stats: {
          watchCount: watchHistory.watchCount,
          watchedDuration: Math.round(watchHistory.watchedDuration / 60), // minutes
          totalDuration: Math.round(watchHistory.totalDuration / 60), // minutes
          completionPercentage: watchHistory.completionPercentage,
          isCompleted: watchHistory.isCompleted,
          lastWatchedAt: watchHistory.lastWatchedAt,
          firstWatchedAt: watchHistory.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get video analytics error:', error);
    res.status(500).json({ message: 'Error fetching video analytics', error: error.message });
  }
});

// @desc    Get category-wise learning progress
// @route   GET /api/analytics/child/:childId/categories
// @access  Private (Parent/Teacher)
router.get('/child/:childId/categories', protect, verifyParentAccess, async (req, res) => {
  try {
    const watchHistory = await WatchHistory.find({
      user: req.child._id
    }).populate('video', 'category ageGroup');

    // Group by category
    const categoryProgress = {};
    
    watchHistory.forEach(item => {
      if (item.video && item.video.category) {
        const category = item.video.category;
        if (!categoryProgress[category]) {
          categoryProgress[category] = {
            totalVideos: 0,
            completedVideos: 0,
            totalWatchTime: 0,
            averageCompletion: 0,
            videos: []
          };
        }
        
        categoryProgress[category].totalVideos += 1;
        if (item.isCompleted) categoryProgress[category].completedVideos += 1;
        categoryProgress[category].totalWatchTime += item.watchedDuration;
        categoryProgress[category].videos.push({
          completionPercentage: item.completionPercentage,
          isCompleted: item.isCompleted
        });
      }
    });

    // Calculate average completion per category
    const categories = Object.entries(categoryProgress).map(([name, data]) => {
      const avgCompletion = data.videos.length > 0
        ? data.videos.reduce((sum, v) => sum + v.completionPercentage, 0) / data.videos.length
        : 0;
      
      return {
        name,
        totalVideos: data.totalVideos,
        completedVideos: data.completedVideos,
        totalWatchTime: Math.round(data.totalWatchTime / 60), // minutes
        averageCompletion: Math.round(avgCompletion),
        completionRate: data.totalVideos > 0 
          ? ((data.completedVideos / data.totalVideos) * 100).toFixed(1)
          : 0
      };
    });

    res.json({
      success: true,
      data: categories.sort((a, b) => b.totalVideos - a.totalVideos)
    });
  } catch (error) {
    console.error('Get category progress error:', error);
    res.status(500).json({ message: 'Error fetching category progress', error: error.message });
  }
});

// @desc    Get learning streaks and milestones
// @route   GET /api/analytics/child/:childId/achievements
// @access  Private (Parent/Teacher)
router.get('/child/:childId/achievements', protect, verifyParentAccess, async (req, res) => {
  try {
    const watchHistory = await WatchHistory.find({
      user: req.child._id
    }).sort({ lastWatchedAt: -1 });

    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    const uniqueDates = [...new Set(watchHistory.map(item => 
      new Date(item.lastWatchedAt).toDateString()
    ))].sort((a, b) => new Date(b) - new Date(a));

    for (let i = 0; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      
      if (i === 0) {
        const today = new Date();
        const diffDays = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
          currentStreak = 1;
          tempStreak = 1;
        }
      }

      if (lastDate) {
        const diffDays = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
          if (i === 0 || currentStreak > 0) currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }

      lastDate = currentDate;
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate achievements
    const totalCompleted = watchHistory.filter(item => item.isCompleted).length;
    const totalWatchTime = watchHistory.reduce((sum, item) => sum + item.watchedDuration, 0);

    const achievements = {
      currentStreak,
      longestStreak,
      totalVideosCompleted: totalCompleted,
      totalWatchTime: Math.round(totalWatchTime / 60), // minutes
      badges: []
    };

    // Award badges
    if (currentStreak >= 7) achievements.badges.push({ name: 'Week Warrior', icon: '🔥', description: '7 day learning streak!' });
    if (totalCompleted >= 10) achievements.badges.push({ name: 'Rising Star', icon: '⭐', description: 'Completed 10 videos' });
    if (totalCompleted >= 50) achievements.badges.push({ name: 'Super Learner', icon: '🌟', description: 'Completed 50 videos' });
    if (totalWatchTime >= 3600) achievements.badges.push({ name: 'Knowledge Seeker', icon: '📚', description: '1 hour of learning' });
    if (totalWatchTime >= 18000) achievements.badges.push({ name: 'Study Champion', icon: '🏆', description: '5 hours of learning' });

    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

// @desc    Get parent's all children overview
// @route   GET /api/analytics/parent/children
// @access  Private (Parent/Teacher)
router.get('/parent/children', protect, async (req, res) => {
  try {
    // Find all children with this parent's email
    // If user has parentEmail, they are a child - find themselves
    // If user doesn't have parentEmail, find children where parentEmail matches their email
    let children;
    
    if (req.user.parentEmail) {
      // This is a child account, find all children with the same parentEmail (siblings)
      children = await User.find({
        parentEmail: req.user.parentEmail
      }).select('_id fullName username childAge avatarUrl');
    } else {
      // This might be a parent account, find children where parentEmail matches their email
      children = await User.find({
        parentEmail: req.user.email
      }).select('_id fullName username childAge avatarUrl');
    }

    // Get quick stats for each child
    const childrenWithStats = await Promise.all(
      children.map(async (child) => {
        const watchHistory = await WatchHistory.find({ user: child._id });
        const totalVideos = watchHistory.length;
        const totalTime = watchHistory.reduce((sum, item) => sum + item.watchedDuration, 0);
        const completed = watchHistory.filter(item => item.isCompleted).length;

        return {
          _id: child._id,
          fullName: child.fullName,
          username: child.username,
          age: child.childAge,
          avatarUrl: child.avatarUrl,
          stats: {
            totalVideosWatched: totalVideos,
            totalWatchTime: Math.round(totalTime / 60), // minutes
            completedVideos: completed,
            completionRate: totalVideos > 0 ? ((completed / totalVideos) * 100).toFixed(1) : 0
          }
        };
      })
    );

    res.json({
      success: true,
      data: childrenWithStats
    });
  } catch (error) {
    console.error('Get children overview error:', error);
    res.status(500).json({ message: 'Error fetching children overview', error: error.message });
  }
});

export default router;
