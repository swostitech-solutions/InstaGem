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
    caption: 'Lost in the city lights. Every corner tells a story. #cityscape #travelgram',
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
    caption: 'The future is now! Check out this amazing piece of tech in action.',
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
