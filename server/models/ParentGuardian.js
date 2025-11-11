import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const parentGuardianSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['parent', 'teacher', 'guardian'],
    default: 'parent'
  },
  phoneNumber: {
    type: String
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizationName: {
    type: String // For teachers
  },
  classGrade: {
    type: String // For teachers
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    weeklyReport: { type: Boolean, default: true },
    screenTimeAlert: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Hash password before saving
parentGuardianSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
parentGuardianSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const ParentGuardian = mongoose.model('ParentGuardian', parentGuardianSchema);

export default ParentGuardian;
