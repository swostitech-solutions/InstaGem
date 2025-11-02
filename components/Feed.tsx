import React from 'react';
import type { Post as PostType, User } from '../types';
import { Post } from './Post';

interface FeedProps {
  posts: PostType[];
  onOpenComments: (post: PostType) => void;
  onProfileClick: (user: User) => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, onOpenComments, onProfileClick }) => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Post key={post.id} post={post} onOpenComments={onOpenComments} onProfileClick={onProfileClick} />
      ))}
    </div>
  );
};
