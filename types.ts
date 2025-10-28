
export interface User {
  username: string;
  avatarUrl: string;
}

export interface Story extends User {
  id: string;
}

export interface Post {
  id: string;
  user: User;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  likes: number;
  comments: { user: string; text: string }[];
  timestamp: string;
}
