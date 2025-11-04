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
    mediaUrl: 'https://www.youtube.com/embed/DR97oWy5pw0',
    mediaType: 'video',
    caption: '🔢 Learn to Count 1-10! Fun counting song for kids ages 3-7. #Math #Learning #KhanAcademy',
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

  // Simple History - History
  {
    id: 'edu_8',
    user: {
      username: 'simple_history',
      avatarUrl: 'https://ui-avatars.com/api/?name=Simple+History&background=14B8A6&color=fff&size=100',
      fullName: 'Simple History',
      bio: 'Fun animated history for kids! �',
      followers: 3000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/qV7AYW6JXUQ',
    mediaType: 'video',
    caption: '� Ancient Egypt for Kids! Learn about pyramids and pharaohs. Ages 8-12. #History #AncientEgypt #Learning',
    likes: 28000,
    comments: [
      { user: 'history_buff', text: 'Fascinating! My daughter is obsessed with Egypt now! 🏺' },
    ],
    timestamp: '3 days ago',
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
      avatarUrl: 'https://ui-avatars.com/api/?name=NASA+Kids&background=0B3D91&color=fff&size=100',
      fullName: 'NASA Kids Club',
      bio: 'Explore space with NASA! 🚀',
      followers: 4000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/libKVRa01L8',
    mediaType: 'video',
    caption: '🪐 Solar System for Kids! Explore planets, stars, and space. Ages 7-12. #Space #NASA #Science',
    likes: 52000,
    comments: [
      { user: 'space_dad', text: 'My son wants to be an astronaut now! 🚀' },
      { user: 'teacher_mike', text: 'Perfect for my space unit!' },
    ],
    timestamp: '1 week ago',
  },

  // Peekaboo Kidz - Science
  {
    id: 'edu_13',
    user: {
      username: 'peekaboo_kidz',
      avatarUrl: 'https://ui-avatars.com/api/?name=Peekaboo+Kidz&background=FF6B6B&color=fff&size=100',
      fullName: 'Peekaboo Kidz',
      bio: 'Fun educational videos for curious kids! 🔬',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/HCDVN7DCzYE',
    mediaType: 'video',
    caption: '🦕 Why Did Dinosaurs Go Extinct? Learn about prehistoric times! Ages 6-12. #Dinosaurs #Science #Learning',
    likes: 67000,
    comments: [
      { user: 'dino_lover', text: 'My kids watched this 5 times! 🦖' },
      { user: 'teacher_jen', text: 'Great for science class!' },
    ],
    timestamp: '2 days ago',
  },

  // Numberblocks - Math
  {
    id: 'edu_14',
    user: {
      username: 'numberblocks',
      avatarUrl: 'https://ui-avatars.com/api/?name=Numberblocks&background=4ECDC4&color=fff&size=100',
      fullName: 'Numberblocks Official',
      bio: 'Learn numbers the fun way! 🔢',
      followers: 3500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/PlwuB9eURHE',
    mediaType: 'video',
    caption: '🔢 Learn Addition with Numberblocks! Fun math for ages 3-7. #Math #Numbers #Learning',
    likes: 89000,
    comments: [
      { user: 'math_mom', text: 'This helped my preschooler understand numbers! �' },
      { user: 'parent_dave', text: 'Brilliant show for early math!' },
    ],
    timestamp: '5 days ago',
  },

  // Alphablocks - Reading
  {
    id: 'edu_15',
    user: {
      username: 'alphablocks',
      avatarUrl: 'https://ui-avatars.com/api/?name=Alphablocks&background=FF9F1C&color=fff&size=100',
      fullName: 'Alphablocks Official',
      bio: 'Learn to read with phonics! 📖',
      followers: 2800000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/qR5kT0G8O1E',
    mediaType: 'video',
    caption: '📚 Learn Phonics and Reading! Fun alphabet adventure for ages 3-6. #Reading #Phonics #ABC',
    likes: 72000,
    comments: [
      { user: 'reading_teacher', text: 'Best phonics resource! My students love it! 📖' },
      { user: 'proud_parent', text: 'My daughter is reading now thanks to this!' },
    ],
    timestamp: '1 week ago',
  },
];

export default educationalPosts;
