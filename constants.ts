import type { Story, Post, User } from './types';

const userAlex: User = { 
  username: 'alex', 
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  fullName: 'Alex Ray',
  bio: 'Photographer & Designer. Capturing moments from around the world.',
  followers: 1258,
  following: 320,
};
const userJane: User = { 
  username: 'jane_doe', 
  avatarUrl: 'https://picsum.photos/seed/2/100/100',
  fullName: 'Jane Doe',
  bio: 'Exploring the intersection of technology and art.',
  followers: 843,
  following: 150,
};
const userTechGuru: User = { 
  username: 'tech_guru', 
  avatarUrl: 'https://picsum.photos/seed/3/100/100',
  fullName: 'Sam Tech',
  bio: 'All things tech. Reviews, news, and tutorials. 🚀',
  followers: 15200,
  following: 50,
};
const userArtLover: User = { 
  username: 'artlover', 
  avatarUrl: 'https://picsum.photos/seed/4/100/100',
  fullName: 'Casey Art',
  bio: 'Museum wanderer. Curator of digital and physical art.',
  followers: 5400,
  following: 890,
};
const userTraveller: User = { 
  username: 'traveller', 
  avatarUrl: 'https://picsum.photos/seed/5/100/100',
  fullName: 'Chris Globe',
  bio: 'On a mission to visit every country. ✈️',
  followers: 22300,
  following: 210,
};
const userFoodie: User = { 
  username: 'foodie', 
  avatarUrl: 'https://picsum.photos/seed/6/100/100',
  fullName: 'Morgan Bites',
  bio: 'If it\'s delicious, I\'m there. Recipe developer and food critic.',
  followers: 18900,
  following: 1200,
};
const userNatureFan: User = { 
  username: 'nature_fan', 
  avatarUrl: 'https://picsum.photos/seed/7/100/100',
  fullName: 'Alex Forrest',
  bio: 'Hiking trails and saving the planet. 🌲',
  followers: 7800,
  following: 45,
};
const userCoderCat: User = { 
  username: 'coder_cat', 
  avatarUrl: 'https://picsum.photos/seed/8/100/100',
  fullName: 'Codey Cat',
  bio: 'Meow-ster of code and professional napper.',
  followers: 4242,
  following: 42,
};

// --- New Educational Users ---
const userKidsLearning: User = {
    username: 'kids_learning_zone',
    avatarUrl: 'https://picsum.photos/seed/edu1/100/100',
    fullName: 'Kids Learning Zone',
    bio: 'Fun and educational content for the little ones! 🎨',
    followers: 189500,
    following: 5,
};
const userRhymeTime: User = {
    username: 'rhyme_time',
    avatarUrl: 'https://picsum.photos/seed/edu2/100/100',
    fullName: 'Rhyme Time',
    bio: 'Classic nursery rhymes and songs for kids. 🎶',
    followers: 250000,
    following: 3,
};
const userScienceFun: User = {
    username: 'science_fun',
    avatarUrl: 'https://picsum.photos/seed/edu3/100/100',
    fullName: 'Science Fun',
    bio: 'Making science and math easy and fun! 🔬🧮',
    followers: 450000,
    following: 12,
};


export const stories: Story[] = [
  { id: '1', ...userAlex },
  { id: '2', ...userJane },
  { id: '3', ...userTechGuru },
  { id: '4', ...userArtLover },
  { id: '5', ...userTraveller },
  { id: '6', ...userFoodie },
  { id: '7', ...userNatureFan },
  { id: '8', ...userCoderCat },
];

export const initialPosts: Post[] = [
  // --- New Educational Posts ---
  {
    id: 'edu_p1',
    user: userKidsLearning,
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mediaType: 'video',
    caption: 'Learn the ABCs with us! 🅰️🅱️Č Fun for toddlers and preschoolers. #Alphabet #KidsLearning #Under5',
    likes: 15234,
    comments: [
      { user: 'jane_doe', text: 'My son loves this!' },
      { user: 'alex', text: 'So colorful and engaging.' }
    ],
    timestamp: '1 day ago',
  },
  {
    id: 'edu_p2',
    user: userRhymeTime,
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    mediaType: 'video',
    caption: "Sing along to 'Twinkle, Twinkle, Little Star'! ✨ A classic rhyme for your little one. #NurseryRhymes #KidsSongs #Rhymes",
    likes: 22100,
    comments: [
        { user: 'traveller', text: 'A timeless classic! ❤️' }
    ],
    timestamp: '2 days ago',
  },
  {
    id: 'edu_p3',
    user: userScienceFun,
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mediaType: 'video',
    caption: 'Ever wondered how gravity works? 🍎 Let\'s break down the basics of this amazing force! #Science #Physics #Education #STEM',
    likes: 31054,
    comments: [
        { user: 'tech_guru', text: 'Great explanation!' },
        { user: 'coder_cat', text: 'Physics is cool! ⚛️' }
    ],
    timestamp: '3 days ago',
  },
  // --- Existing Posts ---
  {
    id: 'p1',
    user: userNatureFan,
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    mediaType: 'video',
    caption: 'Chasing waterfalls and dreams. What an incredible view!',
    likes: 1204,
    comments: [
        { user: 'jane_doe', text: 'Stunning view! Where is this?' },
        { user: 'traveller', text: 'I need to go here! 😍' }
    ],
    timestamp: '2 hours ago',
  },
  {
    id: 'p2',
    user: userTraveller,
    mediaUrl: 'https://picsum.photos/seed/10/600/800',
    mediaType: 'image',
    caption: 'Lost in the city lights with @alex. Every corner tells a story. #cityscape #travelgram',
    likes: 853,
    comments: [
        { user: 'alex', text: 'Great shot!' }
    ],
    timestamp: '5 hours ago',
  },
  {
    id: 'p3',
    user: userTechGuru,
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    mediaType: 'video',
    caption: 'The future is now! Check out this amazing piece of tech in action. Thanks for the tip @coder_cat',
    likes: 2341,
    comments: [],
    timestamp: '1 day ago',
  },
   {
    id: 'p4',
    user: userArtLover,
    mediaUrl: 'https://picsum.photos/seed/12/600/750',
    mediaType: 'image',
    caption: 'Vibrant colors and bold strokes. Art truly is a universal language. 🎨',
    likes: 987,
    comments: [
      { user: 'jane_doe', text: 'This is beautiful.' },
      { user: 'alex', text: 'Love the colors!' },
      { user: 'tech_guru', text: 'Amazing composition.' },
    ],
    timestamp: '2 days ago',
  },
];

export const currentUser: Story & User = {
  id: 'current_user_story',
  username: 'john_dev',
  avatarUrl: 'https://picsum.photos/seed/99/100/100',
  fullName: 'John Dev',
  bio: 'Building cool things with code. This is my Gemini app!',
  followers: 1337,
  following: 101,
};

// --- New additions for user mentions ---
const allUsers: User[] = [
  currentUser,
  userAlex,
  userJane,
  userTechGuru,
  userArtLover,
  userTraveller,
  userFoodie,
  userNatureFan,
  userCoderCat,
  userKidsLearning,
  userRhymeTime,
  userScienceFun,
];

// Create a unique list of users based on username
const userMap = new Map<string, User>();
allUsers.forEach(user => {
  if (!userMap.has(user.username)) {
    userMap.set(user.username, user);
  }
});
initialPosts.forEach(post => {
    if (!userMap.has(post.user.username)) {
      userMap.set(post.user.username, post.user);
    }
});

export const uniqueUsers: User[] = Array.from(userMap.values());
export const userLookup = new Map<string, User>(uniqueUsers.map(u => [u.username, u]));