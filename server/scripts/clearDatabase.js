import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import Post from '../models/Post.js';
import WatchHistory from '../models/WatchHistory.js';
import ParentGuardian from '../models/ParentGuardian.js';
import Child from '../models/Child.js';
import VideoFeedback from '../models/VideoFeedback.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Starting database cleanup...\n');

    // Delete all video feedback
    const feedbackDeleted = await VideoFeedback.deleteMany({});
    console.log(`✅ Deleted ${feedbackDeleted.deletedCount} video feedback records`);

    // Delete all watch history
    const watchHistoryDeleted = await WatchHistory.deleteMany({});
    console.log(`✅ Deleted ${watchHistoryDeleted.deletedCount} watch history records`);

    // Delete all parent guardians
    const parentsDeleted = await ParentGuardian.deleteMany({});
    console.log(`✅ Deleted ${parentsDeleted.deletedCount} parent guardian records`);

    // Delete all children
    const childrenDeleted = await Child.deleteMany({});
    console.log(`✅ Deleted ${childrenDeleted.deletedCount} child records`);

    // Delete all posts (user-generated content)
    const postsDeleted = await Post.deleteMany({});
    console.log(`✅ Deleted ${postsDeleted.deletedCount} posts`);

    // Delete all users EXCEPT admin
    const usersDeleted = await User.deleteMany({ isAdmin: { $ne: true } });
    console.log(`✅ Deleted ${usersDeleted.deletedCount} non-admin users`);

    // Delete all videos EXCEPT those uploaded by admin
    const adminUser = await User.findOne({ isAdmin: true });
    if (adminUser) {
      const videosDeleted = await Video.deleteMany({ uploadedBy: { $ne: adminUser._id } });
      console.log(`✅ Deleted ${videosDeleted.deletedCount} non-admin videos`);
      console.log(`✅ Kept admin account and admin-uploaded videos`);
    } else {
      // If no admin exists, delete all videos
      const allVideosDeleted = await Video.deleteMany({});
      console.log(`✅ Deleted ${allVideosDeleted.deletedCount} videos (no admin found)`);
    }

    console.log('\n🎉 Database cleared successfully!');
    console.log('📝 Admin account and admin videos have been preserved.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
