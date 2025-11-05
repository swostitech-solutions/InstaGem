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
  // === AGES 1-5 CONTENT ===
  
  // Peekaboo Kidz - Why Do We Need Food
  {
    id: 'edu_15',
    user: {
      username: 'peekaboo_kidz',
      avatarUrl: 'https://ui-avatars.com/api/?name=Peekaboo+Kidz&background=FF6B6B&color=fff&size=100',
      fullName: 'Peekaboo Kidz',
      bio: 'Fun educational videos for curious kids! 🔬',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/ZVwXSqxFO2w',
    mediaType: 'video',
    caption: '🍎 Why Do We Need Food? Learn about nutrition. Ages 5-10 #Health #Food #Science',
    likes: 450000,
    comments: [
      { user: 'healthy_mom', text: 'My kids eat healthier now! 🥗' },
      { user: 'teacher_bob', text: 'Great for health education!' },
    ],
    timestamp: '1 week ago',
  },

  // Peekaboo Kidz - What is Photosynthesis
  {
    id: 'edu_16',
    user: {
      username: 'peekaboo_kidz',
      avatarUrl: 'https://ui-avatars.com/api/?name=Peekaboo+Kidz&background=FF6B6B&color=fff&size=100',
      fullName: 'Peekaboo Kidz',
      bio: 'Fun educational videos for curious kids! 🔬',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/g_x5ZdMp2Vc',
    mediaType: 'video',
    caption: '🌱 What is Photosynthesis? How plants make food! Ages 7-10 #Plants #Science #Biology',
    likes: 520000,
    comments: [
      { user: 'science_kid', text: 'Now I understand how plants eat! 🌿' },
      { user: 'biology_teacher', text: 'Perfect explanation for kids!' },
    ],
    timestamp: '1 week ago',
  },

  // Peekaboo Kidz - How Do Eyes Work
  {
    id: 'edu_17',
    user: {
      username: 'peekaboo_kidz',
      avatarUrl: 'https://ui-avatars.com/api/?name=Peekaboo+Kidz&background=FF6B6B&color=fff&size=100',
      fullName: 'Peekaboo Kidz',
      bio: 'Fun educational videos for curious kids! 🔬',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/aZBpG5MQgko',
    mediaType: 'video',
    caption: '👁️ How Do Eyes Work? Learn about vision! Ages 7-10 #Eyes #Science #Biology',
    likes: 380000,
    comments: [
      { user: 'curious_emma', text: 'Our eyes are amazing! 👀' },
      { user: 'science_mom', text: 'My daughter loves anatomy now!' },
    ],
    timestamp: '1 week ago',
  },

  // Khan Academy Kids - Counting with Peck
  {
    id: 'edu_18',
    user: {
      username: 'khanacademy_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Khan+Academy&background=14B8A6&color=fff&size=100',
      fullName: 'Khan Academy Kids',
      bio: 'Free, fun educational content for young learners! 📚',
      followers: 5000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/OinudV2LWlo',
    mediaType: 'video',
    caption: '🔢 Counting 1-10 with Peck! Fun counting adventure. Ages 4-7 #Math #Counting #KhanAcademy',
    likes: 280000,
    comments: [
      { user: 'learning_dad', text: 'Peck is our favorite character! 🐤' },
      { user: 'teacher_anne', text: 'Perfect for kindergarten math!' },
    ],
    timestamp: '2 weeks ago',
  },

  // Khan Academy Kids - Reading Comprehension
  {
    id: 'edu_19',
    user: {
      username: 'khanacademy_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Khan+Academy&background=14B8A6&color=fff&size=100',
      fullName: 'Khan Academy Kids',
      bio: 'Free, fun educational content for young learners! 📚',
      followers: 5000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/nSmN4qyM_Bc',
    mediaType: 'video',
    caption: '📖 Reading Comprehension - Key Details! Learn to understand stories. Ages 5-8 #Reading #Comprehension #Learning',
    likes: 210000,
    comments: [
      { user: 'reading_teacher', text: 'Great for building reading skills! 📚' },
      { user: 'parent_lucy', text: 'My son reads better now!' },
    ],
    timestamp: '2 weeks ago',
  },

  // Khan Academy Kids - Circle Time
  {
    id: 'edu_20',
    user: {
      username: 'khanacademy_kids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Khan+Academy&background=14B8A6&color=fff&size=100',
      fullName: 'Khan Academy Kids',
      bio: 'Free, fun educational content for young learners! 📚',
      followers: 5000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/TBLQx8uCic8',
    mediaType: 'video',
    caption: '⭕ Circle Time with Khan Academy Kids! Learning together. Ages 4-7 #CircleTime #Learning #Social',
    likes: 195000,
    comments: [
      { user: 'homeschool_mom', text: 'We do circle time daily! ⭕' },
      { user: 'preschool_dir', text: 'Great for group learning!' },
    ],
    timestamp: '2 weeks ago',
  },

  // National Geographic Kids - Wild Babies
  {
    id: 'edu_21',
    user: {
      username: 'natgeokids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Nat+Geo&background=FFCC00&color=000&size=100',
      fullName: 'National Geographic Kids',
      bio: 'Explore the world with us! 🌍🐘',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/h51XRnmHxR4',
    mediaType: 'video',
    caption: "🐻 Wild Babies of America's National Parks! Amazing baby animals. Ages 6-12 #Animals #Nature #NatGeo",
    likes: 620000,
    comments: [
      { user: 'animal_lover_10', text: 'Baby animals are so cute! 🐾' },
      { user: 'wildlife_dad', text: 'My kids love National Parks now!' },
    ],
    timestamp: '2 weeks ago',
  },

  // National Geographic Kids - Weird Animal Facts
  {
    id: 'edu_22',
    user: {
      username: 'natgeokids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Nat+Geo&background=FFCC00&color=000&size=100',
      fullName: 'National Geographic Kids',
      bio: 'Explore the world with us! 🌍🐘',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/zGe1OKHnXLQ',
    mediaType: 'video',
    caption: '🦎 Weird Animal Facts! Mind-blowing animal trivia. Ages 7-12 #Animals #Facts #Science',
    likes: 890000,
    comments: [
      { user: 'trivia_kid', text: 'I told everyone these facts! 🤯' },
      { user: 'teacher_mark', text: 'Kids love weird facts!' },
    ],
    timestamp: '3 weeks ago',
  },

  // National Geographic Kids - Animals Adapt
  {
    id: 'edu_23',
    user: {
      username: 'natgeokids',
      avatarUrl: 'https://ui-avatars.com/api/?name=Nat+Geo&background=FFCC00&color=000&size=100',
      fullName: 'National Geographic Kids',
      bio: 'Explore the world with us! 🌍🐘',
      followers: 8000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/7rXEIQ8bvLE',
    mediaType: 'video',
    caption: '🌡️ How Do Animals Adapt to Extreme Climates? Survival science! Ages 8-12 #Animals #Adaptation #Science',
    likes: 540000,
    comments: [
      { user: 'science_student', text: 'Evolution is so cool! 🧬' },
      { user: 'biology_mom', text: 'Great for teaching adaptation!' },
    ],
    timestamp: '3 weeks ago',
  },

  // Cocomelon - Wheels on the Bus
  {
    id: 'edu_2',
    user: {
      username: 'cocomelon',
      avatarUrl: 'https://ui-avatars.com/api/?name=Cocomelon&background=FF6B9D&color=fff&size=100',
      fullName: 'Cocomelon - Nursery Rhymes',
      bio: 'The best nursery rhymes and songs for kids! 🎵',
      followers: 170000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/e_04ZrNroTo',
    mediaType: 'video',
    caption: '🚌 Wheels on the Bus! Classic nursery rhyme for toddlers. Ages 1-5 #Cocomelon #Nursery #Rhymes',
    likes: 4500000,
    comments: [
      { user: 'parent_mom', text: 'My toddler watches this every day! ❤️' },
      { user: 'daycare_teacher', text: 'Kids love singing along!' },
    ],
    timestamp: '2 hours ago',
  },

  // Cocomelon - Johny Johny Yes Papa
  {
    id: 'edu_2',
    user: {
      username: 'cocomelon',
      avatarUrl: 'https://ui-avatars.com/api/?name=Cocomelon&background=FF6B9D&color=fff&size=100',
      fullName: 'Cocomelon - Nursery Rhymes',
      bio: 'The best nursery rhymes and songs for kids! 🎵',
      followers: 170000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/8vJBqIWF6MA',
    mediaType: 'video',
    caption: '🍭 Johny Johny Yes Papa! Fun song about honesty. Ages 1-5 #Cocomelon #Kids #Songs',
    likes: 3800000,
    comments: [
      { user: 'mom_of_3', text: 'My kids giggle every time! 😄' },
      { user: 'preschool_sarah', text: 'Perfect for circle time!' },
    ],
    timestamp: '3 hours ago',
  },

  // Cocomelon - Learning Numbers
  {
    id: 'edu_3',
    user: {
      username: 'cocomelon',
      avatarUrl: 'https://ui-avatars.com/api/?name=Cocomelon&background=FF6B9D&color=fff&size=100',
      fullName: 'Cocomelon - Nursery Rhymes',
      bio: 'The best nursery rhymes and songs for kids! 🎵',
      followers: 170000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/z6l-9fgVo2w',
    mediaType: 'video',
    caption: '🔢 Learning Numbers 1-10! Count along with Cocomelon. Ages 1-5 #Numbers #Learning #Math',
    likes: 2900000,
    comments: [
      { user: 'teaching_mom', text: 'My son learned to count with this! 🔢' },
      { user: 'papa_john', text: 'Educational and fun!' },
    ],
    timestamp: '5 hours ago',
  },

  // Cocomelon - ABC Song
  {
    id: 'edu_4',
    user: {
      username: 'cocomelon',
      avatarUrl: 'https://ui-avatars.com/api/?name=Cocomelon&background=FF6B9D&color=fff&size=100',
      fullName: 'Cocomelon - Nursery Rhymes',
      bio: 'The best nursery rhymes and songs for kids! 🎵',
      followers: 170000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/Gzx5fwTS9yI',
    mediaType: 'video',
    caption: '🔤 ABC Song! Learn the alphabet the fun way. Ages 1-5 #ABC #Alphabet #Learning',
    likes: 5200000,
    comments: [
      { user: 'proud_parent', text: 'My daughter knows all her letters now! 📖' },
      { user: 'teacher_lisa', text: 'Best ABC song ever!' },
    ],
    timestamp: '1 day ago',
  },

  // Super Simple Songs - Hello Song
  {
    id: 'edu_5',
    user: {
      username: 'supersimplesongs',
      avatarUrl: 'https://ui-avatars.com/api/?name=Super+Simple&background=4CAF50&color=fff&size=100',
      fullName: 'Super Simple Songs',
      bio: 'Simple songs for teaching and learning! 🎶',
      followers: 42000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/7kGRtW4S8L4',
    mediaType: 'video',
    caption: '👋 Hello Song! Greetings and good manners for toddlers. Ages 1-5 #Hello #Manners #Greetings',
    likes: 890000,
    comments: [
      { user: 'esl_teacher', text: 'Perfect for teaching English!' },
      { user: 'mom_jenny', text: 'My kids wave to everyone now! 👋' },
    ],
    timestamp: '1 day ago',
  },

  // Super Simple Songs - Animal Sounds
  {
    id: 'edu_6',
    user: {
      username: 'supersimplesongs',
      avatarUrl: 'https://ui-avatars.com/api/?name=Super+Simple&background=4CAF50&color=fff&size=100',
      fullName: 'Super Simple Songs',
      bio: 'Simple songs for teaching and learning! 🎶',
      followers: 42000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/zSKw1T8pABY',
    mediaType: 'video',
    caption: '🐮 Animal Sounds Song! Learn what animals say. Ages 1-5 #Animals #Sounds #Learning',
    likes: 1200000,
    comments: [
      { user: 'farm_dad', text: 'My son moos like a cow now! 🐄' },
      { user: 'daycare_worker', text: 'Kids love making animal sounds!' },
    ],
    timestamp: '2 days ago',
  },

  // Super Simple Songs - Colors Song
  {
    id: 'edu_7',
    user: {
      username: 'supersimplesongs',
      avatarUrl: 'https://ui-avatars.com/api/?name=Super+Simple&background=4CAF50&color=fff&size=100',
      fullName: 'Super Simple Songs',
      bio: 'Simple songs for teaching and learning! 🎶',
      followers: 42000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/lJ-YnVwslds',
    mediaType: 'video',
    caption: '🌈 Colors Song! Learn colors in a fun way. Ages 1-5 #Colors #Rainbow #Learning',
    likes: 950000,
    comments: [
      { user: 'art_teacher_mom', text: 'My daughter knows all her colors! 🎨' },
      { user: 'parent_alex', text: 'Catchy and educational!' },
    ],
    timestamp: '2 days ago',
  },

  // Super Simple Songs - Number Song
  {
    id: 'edu_8',
    user: {
      username: 'supersimplesongs',
      avatarUrl: 'https://ui-avatars.com/api/?name=Super+Simple&background=4CAF50&color=fff&size=100',
      fullName: 'Super Simple Songs',
      bio: 'Simple songs for teaching and learning! 🎶',
      followers: 42000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/oeHpLV-pYzQ',
    mediaType: 'video',
    caption: '🔢 Number Song 1-10! Count along with us. Ages 1-5 #Numbers #Counting #Math',
    likes: 780000,
    comments: [
      { user: 'math_dad', text: 'Great for early math skills! 🔢' },
      { user: 'teacher_maria', text: 'We sing this in class!' },
    ],
    timestamp: '3 days ago',
  },

  // ChuChu TV - Phonics Song
  {
    id: 'edu_9',
    user: {
      username: 'chuchutv',
      avatarUrl: 'https://ui-avatars.com/api/?name=ChuChu+TV&background=FF9800&color=fff&size=100',
      fullName: 'ChuChu TV',
      bio: 'Nursery rhymes and kids songs! 🎵',
      followers: 64000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/R-qhvQVjzJw',
    mediaType: 'video',
    caption: '� Phonics Song with Two Words! Learn letter sounds. Ages 3-5 #Phonics #Reading #ABC',
    likes: 1400000,
    comments: [
      { user: 'reading_mom', text: 'My son is reading because of this! 📚' },
      { user: 'kindergarten_t', text: 'Best phonics resource!' },
    ],
    timestamp: '3 days ago',
  },

  // ChuChu TV - Colorful Eggs
  {
    id: 'edu_10',
    user: {
      username: 'chuchutv',
      avatarUrl: 'https://ui-avatars.com/api/?name=ChuChu+TV&background=FF9800&color=fff&size=100',
      fullName: 'ChuChu TV',
      bio: 'Nursery rhymes and kids songs! 🎵',
      followers: 64000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/3vR60JbkHVc',
    mediaType: 'video',
    caption: '🥚 Learn Colors with Colorful Eggs! Fun color learning. Ages 2-5 #Colors #Learning #Fun',
    likes: 890000,
    comments: [
      { user: 'toddler_parent', text: 'My toddler loves eggs now! 🥚' },
      { user: 'daycare_staff', text: 'Colorful and educational!' },
    ],
    timestamp: '4 days ago',
  },

  // ChuChu TV - Learning Numbers
  {
    id: 'edu_11',
    user: {
      username: 'chuchutv',
      avatarUrl: 'https://ui-avatars.com/api/?name=ChuChu+TV&background=FF9800&color=fff&size=100',
      fullName: 'ChuChu TV',
      bio: 'Nursery rhymes and kids songs! 🎵',
      followers: 64000000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/5fCk_3z4g4E',
    mediaType: 'video',
    caption: '🔢 Learning Numbers for Kids! Count with ChuChu. Ages 2-5 #Numbers #Math #Learning',
    likes: 670000,
    comments: [
      { user: 'counting_kid', text: 'I can count to 10! 🎉' },
      { user: 'parent_sue', text: 'Very engaging for toddlers!' },
    ],
    timestamp: '4 days ago',
  },

  // === AGES 5-10 CONTENT ===

  // Numberblocks - Full Episodes
  {
    id: 'edu_12',
    user: {
      username: 'numberblocks',
      avatarUrl: 'https://ui-avatars.com/api/?name=Numberblocks&background=4ECDC4&color=fff&size=100',
      fullName: 'Numberblocks Official',
      bio: 'Learn numbers the fun way! 🔢',
      followers: 3500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/_x5Ac7H3Kqg',
    mediaType: 'video',
    caption: '🔢 Numberblocks Full Episodes! Math adventures. Ages 3-7 #Math #Numbers #Learning',
    likes: 1800000,
    comments: [
      { user: 'math_mom', text: 'My kids understand math better now! 🔢' },
      { user: 'teacher_kim', text: 'Amazing for teaching number bonds!' },
    ],
    timestamp: '5 days ago',
  },

  // Numberblocks - Number Shapes
  {
    id: 'edu_13',
    user: {
      username: 'numberblocks',
      avatarUrl: 'https://ui-avatars.com/api/?name=Numberblocks&background=4ECDC4&color=fff&size=100',
      fullName: 'Numberblocks Official',
      bio: 'Learn numbers the fun way! 🔢',
      followers: 3500000,
      following: 0,
    },
    mediaUrl: 'https://www.youtube.com/embed/P_pVmQ0ILwU',
    mediaType: 'video',
    caption: '🔷 Number Shapes! Learn shapes with numbers. Ages 4-8 #Shapes #Math #Geometry',
    likes: 920000,
    comments: [
      { user: 'geometry_dad', text: 'My daughter loves shapes now! ⬛' },
      { user: 'primary_teacher', text: 'Great for geometry basics!' },
    ],
    timestamp: '5 days ago',
  },

  // Numberblocks - Addition Adventures
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
    mediaUrl: 'https://www.youtube.com/embed/HFe3d_w2Ll0',
    mediaType: 'video',
    caption: '➕ Addition Adventures! Learn to add with Numberblocks. Ages 5-7 #Addition #Math #Learning',
    likes: 1100000,
    comments: [
      { user: 'homework_helper', text: 'Makes addition so easy! ➕' },
      { user: 'parent_tim', text: 'My son loves math now!' },
    ],
    timestamp: '6 days ago',
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
