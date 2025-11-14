export interface User {
  username: string;
  avatarUrl: string;
  fullName: string;
  bio: string;
  followers: number;
  following: number;
  isAdmin?: boolean;
  childAge?: number;
  likedVideos?: string[];
}

export interface Story extends User {
  id: string;
}

export interface Post {
  id: string;
  user: User;
  mediaUrl: string;
  mediaType: "image" | "video";
  caption: string;
  likes: number;
  views?: number;  // View count for videos
  isLikedByUser?: boolean;  // Whether current user has liked this
  comments: { user: string; text: string }[];
  timestamp: string;
}
