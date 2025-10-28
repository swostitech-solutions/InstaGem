import type { Story, Post } from './types';

export const stories: Story[] = [
  { id: '1', username: 'alex', avatarUrl: 'https://picsum.photos/seed/1/100/100' },
  { id: '2', username: 'jane_doe', avatarUrl: 'https://picsum.photos/seed/2/100/100' },
  { id: '3', username: 'tech_guru', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
  { id: '4', username: 'artlover', avatarUrl: 'https://picsum.photos/seed/4/100/100' },
  { id: '5', username: 'traveller', avatarUrl: 'https://picsum.photos/seed/5/100/100' },
  { id: '6', username: 'foodie', avatarUrl: 'https://picsum.photos/seed/6/100/100' },
  { id: '7', username: 'nature_fan', avatarUrl: 'https://picsum.photos/seed/7/100/100' },
  { id: '8', username: 'coder_cat', avatarUrl: 'https://picsum.photos/seed/8/100/100' },
];

export const initialPosts: Post[] = [
  {
    id: 'p1',
    user: { username: 'nature_fan', avatarUrl: 'https://picsum.photos/seed/7/100/100' },
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
    user: { username: 'traveller', avatarUrl: 'https://picsum.photos/seed/5/100/100' },
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
    user: { username: 'tech_guru', avatarUrl: 'https://picsum.photos/seed/3/100/100' },
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    mediaType: 'video',
    caption: 'The future is now! Check out this amazing piece of tech in action.',
    likes: 2341,
    comments: [],
    timestamp: '1 day ago',
  },
   {
    id: 'p4',
    user: { username: 'artlover', avatarUrl: 'https://picsum.photos/seed/4/100/100' },
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

export const currentUser: Story = {
  id: 'current_user_story',
  username: 'john_dev',
  avatarUrl: 'https://picsum.photos/seed/99/100/100',
};