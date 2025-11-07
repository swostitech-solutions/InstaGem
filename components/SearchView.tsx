import React, { useState, useEffect } from "react";
import type { Post as PostType } from "../types";
import { SearchIcon } from "./icons/SearchIcon";
import { GridPostItem } from "./GridPostItem";
import { useAuth } from "../context/AuthContext";
import * as videosAPI from "../api/videosAPI";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  ageGroup: string;
  category: string;
  views: number;
  likes: number;
}

interface SearchViewProps {
  posts: PostType[];
}

export const SearchView: React.FC<SearchViewProps> = ({ posts }) => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVideos();
  }, [user]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const ageGroup = user?.childAge
        ? getAgeGroupFromAge(user.childAge)
        : undefined;
      const response = await videosAPI.getVideos(ageGroup);
      setVideos(response.data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter(
    (video) =>
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="p-2 sticky top-[57px] bg-black z-10">
        <div className="relative">
          <input
            type="search"
            placeholder="Search educational videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
            aria-label="Search content"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <SearchIcon className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">
            {searchQuery
              ? "No videos found"
              : user?.childAge
              ? `No videos for ages ${getAgeGroupLabel(user.childAge)}`
              : "No videos available"}
          </p>
          {user?.childAge && !searchQuery && (
            <p className="text-sm mt-2">
              Videos for your age group will appear here
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5">
          {filteredVideos.map((video) => (
            <VideoGridItem key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

const VideoGridItem: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <div className="relative aspect-square bg-gray-800 cursor-pointer hover:opacity-80 transition-opacity">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
        <div className="text-white text-xs">
          <p className="font-semibold truncate">{video.title}</p>
          <div className="flex items-center space-x-2 text-gray-300 mt-1">
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              {video.views}
            </span>
            <span className="flex items-center">❤️ {video.likes}</span>
          </div>
        </div>
      </div>
      {/* Video play icon overlay */}
      <div className="absolute top-2 right-2">
        <svg
          className="w-6 h-6 text-white drop-shadow-lg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>
    </div>
  );
};

const getAgeGroupLabel = (age: number): string => {
  if (age >= 1 && age < 5) return "1-4";
  if (age >= 5 && age < 10) return "5-9";
  if (age >= 10 && age < 13) return "10-12";
  if (age >= 13 && age <= 17) return "13-17";
  return "all ages";
};

const getAgeGroupFromAge = (age: number): string => {
  if (age >= 1 && age < 5) return "1-5";
  if (age >= 5 && age < 10) return "5-10";
  if (age >= 10 && age < 13) return "10-13";
  if (age >= 13 && age <= 17) return "13-17";
  return "1-5"; // default
};
