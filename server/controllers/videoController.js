import Video from '../models/Video.js';
import User from '../models/User.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Upload new video
// @route   POST /api/admin/videos
// @access  Private (Admin only)
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, ageGroup, category, learningObjectives, duration } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: 'Video and thumbnail files are required' });
    }

    // Convert video buffer to base64
    const videoB64 = Buffer.from(req.files.video[0].buffer).toString('base64');
    const videoDataURI = `data:${req.files.video[0].mimetype};base64,${videoB64}`;

    // Convert thumbnail buffer to base64
    const thumbB64 = Buffer.from(req.files.thumbnail[0].buffer).toString('base64');
    const thumbDataURI = `data:${req.files.thumbnail[0].mimetype};base64,${thumbB64}`;

    // Upload video to Cloudinary
    const videoUpload = await cloudinary.uploader.upload(videoDataURI, {
      resource_type: 'video',
      folder: 'instagem/videos',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    // Upload thumbnail to Cloudinary
    const thumbnailUpload = await cloudinary.uploader.upload(thumbDataURI, {
      resource_type: 'image',
      folder: 'instagem/thumbnails',
      transformation: [
        { width: 640, height: 360, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    const video = await Video.create({
      title,
      description,
      videoUrl: videoUpload.secure_url,
      thumbnailUrl: thumbnailUpload.secure_url,
      ageGroup,
      category,
      learningObjectives: learningObjectives ? JSON.parse(learningObjectives) : [],
      duration: duration || videoUpload.duration,
      uploadedBy: req.user._id,
      cloudinaryPublicId: videoUpload.public_id,
      thumbnailPublicId: thumbnailUpload.public_id,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Upload video error:', error);
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
};

// @desc    Get all videos (admin view)
// @route   GET /api/admin/videos
// @access  Private (Admin only)
export const getAllVideos = async (req, res) => {
  try {
    const { status, ageGroup, category, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (ageGroup) query.ageGroup = ageGroup;
    if (category) query.category = category;

    const videos = await Video.find(query)
      .populate('uploadedBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get all videos error:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// @desc    Get single video
// @route   GET /api/admin/videos/:id
// @access  Private (Admin only)
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploadedBy', 'username email')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatarUrl');

    if (!video) {
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
};

// @desc    Update video
// @route   PUT /api/admin/videos/:id
// @access  Private (Admin only)
export const updateVideo = async (req, res) => {
  try {
    const { title, description, ageGroup, category, learningObjectives, status } = req.body;

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Update fields
    if (title) video.title = title;
    if (description) video.description = description;
    if (ageGroup) video.ageGroup = ageGroup;
    if (category) video.category = category;
    if (learningObjectives) video.learningObjectives = learningObjectives;
    if (status) video.status = status;

    await video.save();

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
};

// @desc    Delete video
// @route   DELETE /api/admin/videos/:id
// @access  Private (Admin only)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Delete from Cloudinary
    if (video.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(video.cloudinaryPublicId, { resource_type: 'video' });
    }
    if (video.thumbnailPublicId) {
      await cloudinary.uploader.destroy(video.thumbnailPublicId);
    }

    await video.deleteOne();

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

// @desc    Publish video
// @route   PATCH /api/admin/videos/:id/publish
// @access  Private (Admin only)
export const publishVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.status = 'published';
    video.publishedAt = new Date();
    await video.save();

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Publish video error:', error);
    res.status(500).json({ message: 'Error publishing video', error: error.message });
  }
};

// @desc    Unpublish video
// @route   PATCH /api/admin/videos/:id/unpublish
// @access  Private (Admin only)
export const unpublishVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.status = 'draft';
    await video.save();

    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Unpublish video error:', error);
    res.status(500).json({ message: 'Error unpublishing video', error: error.message });
  }
};

// @desc    Get video analytics
// @route   GET /api/admin/videos/:id/analytics
// @access  Private (Admin only)
export const getVideoAnalytics = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const analytics = {
      videoId: video._id,
      title: video.title,
      views: video.views,
      likes: video.likes.length,
      comments: video.comments.length,
      status: video.status,
      publishedAt: video.publishedAt,
      ageGroup: video.ageGroup,
      category: video.category,
      engagementRate: video.views > 0 ? ((video.likes.length / video.views) * 100).toFixed(2) : 0
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};
