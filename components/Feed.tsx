
import React from 'react';
import type { Post as PostType } from '../types';
import { Post } from './Post';

interface FeedProps {
  posts: PostType[];
}

export const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
