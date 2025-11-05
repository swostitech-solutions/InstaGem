import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@instagem.com' });
    
    if (existingAdmin) {
      console.log('❌ Admin account already exists!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email: admin@instagem.com');
      console.log('�� Password: Admin@InstaGem2025');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      process.exit(0);
    }

    // Create admin account (no childAge for admin)
    const admin = await User.create({
      username: 'instagem_admin',
      email: 'admin@instagem.com',
      password: 'Admin@InstaGem2025',
      fullName: 'InstaGem Administrator',
      isAdmin: true,
      bio: 'Platform Administrator'
    });

    console.log('\n🎉 ADMIN ACCOUNT CREATED SUCCESSFULLY!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@instagem.com');
    console.log('🔑 Password: Admin@InstaGem2025');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  SECURITY NOTICE:');
    console.log('   • Keep these credentials SECURE');
    console.log('   • Only share with authorized admins');
    console.log('   • Change password after first login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
