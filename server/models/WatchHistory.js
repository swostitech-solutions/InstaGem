import mongoose from 'mongoose';

const watchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  watchedDuration: {
    type: Number, // in seconds
    default: 0
  },
  totalDuration: {
    type: Number, // total video duration in seconds
    required: true
  },
  completionPercentage: {
    type: Number, // 0-100
    default: 0
  },
  lastWatchedAt: {
    type: Date,
    default: Date.now
  },
  watchCount: {
    type: Number,
    default: 1
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for faster queries
watchHistorySchema.index({ user: 1, video: 1 });
watchHistorySchema.index({ user: 1, lastWatchedAt: -1 });

// Calculate completion percentage before saving
watchHistorySchema.pre('save', function(next) {
  if (this.totalDuration > 0) {
    this.completionPercentage = Math.min(100, Math.round((this.watchedDuration / this.totalDuration) * 100));
    this.isCompleted = this.completionPercentage >= 90; // Consider 90% as completed
  }
  next();
});

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema);

export default WatchHistory;
