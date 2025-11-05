import express from 'express';
const router = express.Router();
import Video from '../models/Video.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

// @desc    Get published videos for feed (age-based)
// @route   GET /api/videos
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { ageGroup, category, page = 1, limit = 6 } = req.query;

    const query = { status: 'published' };
    
    // Filter by age group if provided
    if (ageGroup) {
      query.ageGroup = ageGroup;
    } else if (req.user.childAge) {
      // Auto-filter based on user's age
      if (req.user.childAge >= 1 && req.user.childAge <= 5) {
        query.ageGroup = '1-5';
      } else if (req.user.childAge >= 5 && req.user.childAge <= 10) {
        query.ageGroup = { $in: ['1-5', '5-10'] };
      } else if (req.user.childAge >= 10 && req.user.childAge <= 13) {
        query.ageGroup = { $in: ['5-10', '10-13'] };
      } else if (req.user.childAge >= 13 && req.user.childAge <= 17) {
        query.ageGroup = { $in: ['10-13', '13-17'] };
      }
    }

    if (category) {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'username avatarUrl fullName')
      .select('-cloudinaryPublicId -thumbnailPublicId')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploadedBy', 'username avatarUrl fullName bio followers')
      .populate('comments.user', 'username avatarUrl');

    if (!video || video.status !== 'published') {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
});

// @desc    Like/Unlike video
// @route   POST /api/videos/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const likeIndex = video.likes.indexOf(req.user._id);

    if (likeIndex > -1) {
      // Unlike
      video.likes.splice(likeIndex, 1);
      
      // Remove from user's liked videos
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { likedVideos: video._id }
      });
    } else {
      // Like
      video.likes.push(req.user._id);
      
      // Add to user's liked videos
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { likedVideos: video._id }
      });
    }

    await video.save();

    res.json({
      success: true,
      likes: video.likes.length,
      isLiked: likeIndex === -1
    });
  } catch (error) {
    console.error('Like video error:', error);
    res.status(500).json({ message: 'Error liking video', error: error.message });
  }
});

// @desc    Add comment to video
// @route   POST /api/videos/:id/comment
// @access  Private
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const newComment = {
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date()
    };

    video.comments.push(newComment);
    await video.save();

    // Populate the new comment
    await video.populate('comments.user', 'username avatarUrl');

    res.status(201).json({
      success: true,
      comment: video.comments[video.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

// @desc    Track video view
// @route   POST /api/videos/:id/view
// @access  Private
router.post('/:id/view', protect, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({
      success: true,
      views: video.views
    });
  } catch (error) {
    console.error('Track view error:', error);
    res.status(500).json({ message: 'Error tracking view', error: error.message });
  }
});

export default router;
