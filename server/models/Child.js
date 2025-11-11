import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true
  },
  childAge: {
    type: Number,
    required: true,
    min: 1,
    max: 17
  },
  childUsername: {
    type: String,
    required: true,
    unique: true
  },
  childEmail: {
    type: String,
    required: true,
    unique: true
  },
  childPassword: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: 'https://picsum.photos/seed/default/100/100'
  },
  favoriteColor: {
    type: String,
    default: 'blue'
  },
  parentGuardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentGuardian',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  screenTimeLimit: {
    type: Number, // minutes per day
    default: 60
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

childSchema.index({ parentGuardian: 1 });

const Child = mongoose.model('Child', childSchema);

export default Child;
