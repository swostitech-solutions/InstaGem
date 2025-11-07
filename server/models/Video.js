import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Video description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  ageGroup: {
    type: String,
    required: [true, 'Age group is required'],
    enum: ['1-5', '5-10', '10-13', '13-17'],
    index: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Math',
      'Science',
      'Reading',
      'Writing',
      'Language',
      'Music',
      'Art',
      'Social Studies',
      'Life Skills',
      'Physical Education',
      'Technology',
      'Critical Thinking'
    ],
    index: true
  },
  learningObjectives: [{
    type: String,
    trim: true
  }],
  duration: {
    type: Number, // Duration in seconds
    required: [true, 'Video duration is required'],
    min: [1, 'Duration must be at least 1 second']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    index: true
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  publishedAt: {
    type: Date
  },
  cloudinaryPublicId: {
    type: String // For video deletion from Cloudinary
  },
  thumbnailPublicId: {
    type: String // For thumbnail deletion from Cloudinary
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
videoSchema.index({ status: 1, ageGroup: 1, createdAt: -1 });
videoSchema.index({ status: 1, category: 1, createdAt: -1 });
videoSchema.index({ uploadedBy: 1, status: 1 });

// Virtual for like count
videoSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

// Virtual for comment count
videoSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

// Ensure virtuals are included in JSON
videoSchema.set('toJSON', { virtuals: true });
videoSchema.set('toObject', { virtuals: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;
