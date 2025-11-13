import mongoose from 'mongoose';

const videoFeedbackSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // Star rating (1-5)
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  // Emoji sentiment
  emojiRating: {
    type: String,
    required: true,
    enum: ['loved', 'good', 'okay', 'meh', 'boring']
  },
  // What topics did they learn? (multi-select)
  topicsLearned: [{
    type: String,
    enum: [
      'science',
      'math',
      'art',
      'music',
      'language',
      'culture',
      'nature',
      'technology',
      'sports',
      'creativity',
      'problem-solving',
      'fun-facts'
    ]
  }],
  // Optional text feedback
  comment: {
    type: String,
    trim: true,
    maxlength: 500
  },
  // How much of the video they watched
  completionPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  // How long it took them to respond (engagement metric)
  responseTime: {
    type: Number, // in seconds
    default: 0
  },
  // Points earned from this feedback
  pointsEarned: {
    type: Number,
    default: 0
  },
  // Metadata
  ageGroup: String,
  deviceType: String,
  
  // Badge/achievement tracking
  triggeredAchievements: [{
    badgeId: String,
    badgeName: String,
    pointsAwarded: Number
  }]
}, {
  timestamps: true
});

// Compound indexes for efficient queries
videoFeedbackSchema.index({ video: 1, createdAt: -1 });
videoFeedbackSchema.index({ user: 1, createdAt: -1 });
videoFeedbackSchema.index({ emojiRating: 1, starRating: -1 });

// Virtual for sentiment category
videoFeedbackSchema.virtual('sentimentCategory').get(function() {
  if (this.starRating >= 4 && this.emojiRating === 'loved') return 'Excellent';
  if (this.starRating >= 3) return 'Good';
  if (this.starRating >= 2) return 'Average';
  return 'Needs Improvement';
});

// Ensure virtuals are included in JSON
videoFeedbackSchema.set('toJSON', { virtuals: true });
videoFeedbackSchema.set('toObject', { virtuals: true });

const VideoFeedback = mongoose.model('VideoFeedback', videoFeedbackSchema);

export default VideoFeedback;
