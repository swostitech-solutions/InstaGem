import React from "react";
import type { Story } from "../types";
import { AddIcon } from "./icons/AddIcon";
import { useAuth } from "../context/AuthContext";

interface StoryTrayProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

const StoryItem: React.FC<{ story: Story; onClick: () => void }> = ({
  story,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 flex flex-col items-center space-y-1 w-20 text-left"
  >
    <div className="rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
      <div className="bg-black rounded-full p-0.5">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={story.avatarUrl}
          alt={story.username}
        />
      </div>
    </div>
    <span className="text-xs truncate w-full text-center">
      {story.username}
    </span>
  </button>
);

const YourStory: React.FC<{ onClick: () => void; user: any }> = ({
  onClick,
  user,
}) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 flex flex-col items-center space-y-1 w-20 relative text-left"
  >
    <div className="rounded-full p-0.5">
      <div className="bg-black rounded-full p-0.5">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={user?.avatarUrl || "https://picsum.photos/seed/default/100/100"}
          alt={user?.username || "You"}
        />
      </div>
    </div>
    <div className="absolute bottom-4 right-1 bg-blue-500 rounded-full border-2 border-black p-0.5">
      <AddIcon className="w-4 h-4 text-white" />
    </div>
    <span className="text-xs truncate w-full text-center">Your story</span>
  </button>
);

export const StoryTray: React.FC<StoryTrayProps> = ({
  stories,
  onStoryClick,
}) => {
  const { user } = useAuth();

  return (
    <div className="px-4 py-3 border-b border-gray-800">
      <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
        {user && (
          <YourStory
            user={user}
            onClick={() =>
              onStoryClick({
                ...user,
                id: "current_user",
                followers: user.followers || 0,
                following: user.following || 0,
              })
            }
          />
        )}
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            onClick={() => onStoryClick(story)}
          />
        ))}
      </div>
    </div>
  );
};
