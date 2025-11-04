import type { Post as PostType } from './types';

/**
 * EDUCATIONAL CONTENT FOR KIDS - COPYRIGHT NOTICE
 * 
 * All videos embedded below are from official YouTube channels.
 * We do not host, download, or modify any content.
 * Videos are embedded using YouTube's official embed feature.
 * 
 * Content Sources (All rights reserved by respective owners):
 * - Khan Academy (Educational non-profit)
 * - National Geographic Kids (Licensed educational content)
 * - PBS Kids (Public broadcasting educational content)
 * - Sesame Street (Educational entertainment)
 * - NASA (Public domain government content)
 * - TED-Ed (Educational content under Creative Commons where applicable)
 * - Mark Rober (Permission granted through embed feature)
 * 
 * Legal Basis:
 * - YouTube Terms of Service allow embedding
 * - Fair Use: Educational, non-commercial purpose
 * - No content modification or re-uploading
 * - Proper attribution maintained
 * - Users redirected to original YouTube videos
 * 
 * If you are a content owner and wish to have your content removed,
 * please contact us at: content@instagem.com
 */

// Curated educational content for kids from various platforms
export const educationalPosts: PostType[] = [
  // Khan Academy Kids - Math
  {
    id: 'edu_1',
    user: {
      username: 'khanacademy_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Khan+Academy&background=14B8A6&color=fff&size=100',
      fullName: 'Khan Academy Kids',
      bio: 'Free, fun educational content for young learners! 📚',
      followers: 5000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/lPgAul0fQNk',
    mediaType: 'video',
    caption: '🔢 Learn to Count 1-10! Fun math adventure for kids ages 5-7. #Math #Learning #KhanAcademy',
    likes: 45000,
    comments: [
      { user: 'parent_mom', text: 'My kids love this! Very educational ❤️' },
      { user: 'teacher_sarah', text: 'Perfect for my kindergarten class!' },
    ],
    timestamp: '2 hours ago',
  },
  
  // National Geographic Kids - Science
  {
    id: 'edu_2',
    user: {
      username: 'natgeokids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Nat+Geo&background=FFCC00&color=000&size=100',
      fullName: 'National Geographic Kids',
      bio: 'Explore the world with us! 🌍🐘',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/Xj2D3-FEY5w',
    mediaType: 'video',
    caption: '🐘 Amazing Animals: Elephants! Learn about these gentle giants. Perfect for ages 6-12 #Science #Animals #NatGeo',
    likes: 82000,
    comments: [
      { user: 'young_explorer', text: 'Elephants are my favorite! 🐘' },
      { user: 'science_dad', text: 'Great educational content!' },
    ],
    timestamp: '5 hours ago',
  },

  // Crash Course Kids - Science
  {
    id: 'edu_3',
    user: {
      username: 'crashcourse_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Crash+Course&background=8B5CF6&color=fff&size=100',
      fullName: 'Crash Course Kids',
      bio: 'Making learning fun and accessible! 🚀',
      followers: 3500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/BhIEIO0vaBE',
    mediaType: 'video',
    caption: '🌊 The Water Cycle Explained! How does water travel? Ages 8-12 #Science #Environment #Learning',
    likes: 38000,
    comments: [
      { user: 'smart_kid_101', text: 'Now I understand how rain works!' },
      { user: 'homeschool_mom', text: 'Adding this to our curriculum!' },
    ],
    timestamp: '1 day ago',
  },

  // SciShow Kids - Science
  {
    id: 'edu_4',
    user: {
      username: 'scishow_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=SciShow+Kids&background=3B82F6&color=fff&size=100',
      fullName: 'SciShow Kids',
      bio: 'Science for curious young minds! 🔬',
      followers: 2800000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/Uqq2M1K87BI',
    mediaType: 'video',
    caption: '🌈 Why is the Sky Blue? Discover the science of colors! Ages 5-10 #Science #Colors #Fun',
    likes: 52000,
    comments: [
      { user: 'curious_emma', text: 'This is so cool! 🌈' },
      { user: 'dad_teacher', text: 'Perfect explanation for kids!' },
    ],
    timestamp: '1 day ago',
  },

  // PBS Kids - Arts & Creativity
  {
    id: 'edu_5',
    user: {
      username: 'pbskids',
      avatarUrl: 'https://ui-avatars.com/api/?name=PBS+Kids&background=EC4899&color=fff&size=100',
      fullName: 'PBS Kids',
      bio: 'Educational TV for kids! 📺✨',
      followers: 6000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/gqWEbfKb5Ew',
    mediaType: 'video',
    caption: '🎨 Art Time! Learn to draw and create. Perfect for creative kids ages 4-10! #Art #Creativity #PBS',
    likes: 67000,
    comments: [
      { user: 'artist_kid', text: 'I drew my family after watching this! 🎨' },
      { user: 'creative_parent', text: 'My daughter loves art now!' },
    ],
    timestamp: '2 days ago',
  },

  // Sesame Street - Social & Emotional Learning
  {
    id: 'edu_6',
    user: {
      username: 'sesamestreet',
      avatarUrl: 'https://ui-avatars.com/api/?name=Sesame+Street&background=10B981&color=fff&size=100',
      fullName: 'Sesame Street',
      bio: 'Learning with friends for 50+ years! 🟢🔵🔴',
      followers: 10000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/AkBQLvhdKKs',
    mediaType: 'video',
    caption: '❤️ Feelings and Emotions! Learn about feelings with Elmo. Ages 3-7 #Emotions #SocialLearning #Sesame',
    likes: 125000,
    comments: [
      { user: 'toddler_parent', text: 'This helped my son express his feelings!' },
      { user: 'preschool_teacher', text: 'We watch this in class!' },
    ],
    timestamp: '3 days ago',
  },

  // TED-Ed Kids - General Knowledge
  {
    id: 'edu_7',
    user: {
      username: 'ted_ed',
      avatarUrl: 'https://ui-avatars.com/api/?name=TED-Ed&background=EF4444&color=fff&size=100',
      fullName: 'TED-Ed',
      bio: 'Lessons worth sharing! 💡',
      followers: 4500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/7oKjW1OIjuw',
    mediaType: 'video',
    caption: '🦖 How Did Dinosaurs Become Extinct? Fascinating history for ages 8-14! #History #Dinosaurs #TED',
    likes: 91000,
    comments: [
      { user: 'dino_fan_10', text: 'Dinosaurs are awesome! 🦖' },
      { user: 'science_teacher', text: 'Great for my 5th graders!' },
    ],
    timestamp: '4 days ago',
  },

  // Khan Academy - History
  {
    id: 'edu_8',
    user: {
      username: 'khanacademy',
      avatarUrl: 'https://ui-avatars.com/api/?name=Khan+Academy&background=14B8A6&color=fff&size=100',
      fullName: 'Khan Academy',
      bio: 'World-class education for anyone, anywhere! 🌏',
      followers: 7000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/8ru8mBcWUJA',
    mediaType: 'video',
    caption: '🏛️ Ancient Civilizations: Egypt! Explore pyramids and pharaohs. Ages 9-13 #History #Egypt #Learning',
    likes: 73000,
    comments: [
      { user: 'history_buff_11', text: 'I want to visit Egypt now!' },
      { user: 'middle_school_teacher', text: 'Perfect for my history class!' },
    ],
    timestamp: '5 days ago',
  },

  // Free School - Geography
  {
    id: 'edu_9',
    user: {
      username: 'freeschool',
      avatarUrl: 'https://ui-avatars.com/api/?name=Free+School&background=F59E0B&color=fff&size=100',
      fullName: 'Free School',
      bio: 'Quality educational videos for free! 🎓',
      followers: 1500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/a6LMSAySbJc',
    mediaType: 'video',
    caption: '🌍 Continents of the World! Learn geography in a fun way. Ages 6-11 #Geography #World #Education',
    likes: 42000,
    comments: [
      { user: 'world_explorer', text: 'I can name all 7 continents now!' },
      { user: 'geography_teacher', text: 'Great visual learning!' },
    ],
    timestamp: '6 days ago',
  },

  // Mark Rober - Engineering & STEM
  {
    id: 'edu_10',
    user: {
      username: 'mark_rober',
      avatarUrl: 'https://ui-avatars.com/api/?name=Mark+Rober&background=6366F1&color=fff&size=100',
      fullName: 'Mark Rober',
      bio: 'Former NASA engineer making science fun! 🚀',
      followers: 25000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/A_BlNA7bBQE',
    mediaType: 'video',
    caption: '🚀 Building Amazing Inventions! See engineering in action. Ages 10-17 #STEM #Engineering #Science',
    likes: 310000,
    comments: [
      { user: 'future_engineer', text: 'I want to be an engineer like you!' },
      { user: 'stem_teacher', text: 'Inspiring the next generation!' },
    ],
    timestamp: '1 week ago',
  },

  // The Kid Should See This - Nature
  {
    id: 'edu_11',
    user: {
      username: 'thekidshouldseethis',
      avatarUrl: 'https://ui-avatars.com/api/?name=Kid+Should+See&background=059669&color=fff&size=100',
      fullName: 'The Kid Should See This',
      bio: 'Smart videos for curious minds! 🌱',
      followers: 890000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/aMmX-n-NFqg',
    mediaType: 'video',
    caption: '🌿 How Plants Grow! Time-lapse magic of nature. Ages 5-12 #Nature #Plants #Science',
    likes: 34000,
    comments: [
      { user: 'plant_lover_kid', text: 'Im growing my own plant now! 🌱' },
      { user: 'bio_teacher', text: 'Perfect for teaching photosynthesis!' },
    ],
    timestamp: '1 week ago',
  },

  // NASA Kids Club - Space
  {
    id: 'edu_12',
    user: {
      username: 'nasa_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=NASA+Kids&background=1E40AF&color=fff&size=100',
      fullName: 'NASA Kids Club',
      bio: 'Explore space with NASA! 🌌🚀',
      followers: 4200000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/uKXYJpXBhA4',
    mediaType: 'video',
    caption: '🌌 Journey Through the Solar System! Visit planets and moons. Ages 7-14 #Space #NASA #Planets',
    likes: 156000,
    comments: [
      { user: 'space_kid_99', text: 'Mars is my favorite planet! 🔴' },
      { user: 'astronomy_teacher', text: 'Amazing visual tour!' },
    ],
    timestamp: '1 week ago',
  },
];
