import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    fullName: {
      type: String,
      default: '',
      maxlength: [50, 'Full name cannot exceed 50 characters'],
    },
    childAge: {
      type: Number,
      min: [1, 'Age must be at least 1'],
      max: [17, 'Age cannot exceed 17'],
    },
    parentEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid parent email'],
    },
    favoriteColor: {
      type: String,
      default: 'purple',
    },
    avatarUrl: {
      type: String,
      default: 'https://picsum.photos/seed/default/100/100',
    },
    bio: {
      type: String,
      default: '',
      maxlength: [150, 'Bio cannot exceed 150 characters'],
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedVideos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    }],
    // 🎮 GAMIFICATION STATS - Super Epic!
    gamification: {
      totalPoints: {
        type: Number,
        default: 0,
        min: 0
      },
      currentLevel: {
        type: Number,
        default: 1,
        min: 1
      },
      currentStreak: {
        type: Number,
        default: 0,
        min: 0
      },
      longestStreak: {
        type: Number,
        default: 0,
        min: 0
      },
      lastActivityDate: {
        type: Date,
        default: Date.now
      },
      videosCompleted: {
        type: Number,
        default: 0,
        min: 0
      },
      feedbackGiven: {
        type: Number,
        default: 0,
        min: 0
      },
      // Unlocked badges
      badges: [{
        badgeId: String,
        badgeName: String,
        unlockedAt: {
          type: Date,
          default: Date.now
        },
        description: String,
        icon: String
      }],
      // Category mastery (percentage completed per category)
      categoryProgress: {
        Math: { type: Number, default: 0 },
        Science: { type: Number, default: 0 },
        Reading: { type: Number, default: 0 },
        Writing: { type: Number, default: 0 },
        Language: { type: Number, default: 0 },
        Music: { type: Number, default: 0 },
        Art: { type: Number, default: 0 },
        'Social Studies': { type: Number, default: 0 },
        'Life Skills': { type: Number, default: 0 },
        'Physical Education': { type: Number, default: 0 },
        Technology: { type: Number, default: 0 },
        'Critical Thinking': { type: Number, default: 0 }
      },
      // Daily/weekly challenges completed
      challengesCompleted: {
        type: Number,
        default: 0
      },
      // Favorite categories (based on feedback)
      favoriteCategories: [String],
      // Title (based on level)
      title: {
        type: String,
        default: 'Beginner Explorer'
      }
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Virtual for follower count
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

// Virtual for following count
userSchema.virtual('followingCount').get(function () {
  return this.following.length;
});

const User = mongoose.model('User', userSchema);

export default User;
