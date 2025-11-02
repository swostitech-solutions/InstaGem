import React, { useMemo } from 'react';
import { uniqueUsers } from '../constants';
import type { User } from '../types';

interface UserSuggestionsProps {
  query: string;
  onSelectUser: (username: string) => void;
  isCommentInput?: boolean;
}

export const UserSuggestions: React.FC<UserSuggestionsProps> = ({ query, onSelectUser, isCommentInput = false }) => {
  const suggestions = useMemo(() => {
    if (query === null) return [];
    if (query.trim() === '') {
      // Show some initial suggestions if query is just '@'
      return uniqueUsers.slice(0, 5);
    }
    const lowerCaseQuery = query.toLowerCase();
    return uniqueUsers.filter(user =>
      user.username.toLowerCase().startsWith(lowerCaseQuery) ||
      user.fullName.toLowerCase().includes(lowerCaseQuery)
    ).slice(0, 5);
  }, [query]);

  if (suggestions.length === 0) {
    return null;
  }

  const positionClass = isCommentInput
    ? 'bottom-full mb-2' // Position above the comment input
    : 'bottom-full mb-1';  // Position above the caption textarea

  return (
    <div className={`absolute left-0 right-0 ${positionClass} bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto`}>
      <ul>
        {suggestions.map(user => (
          <li key={user.username}>
            <button
              onClick={() => onSelectUser(user.username)}
              className="w-full text-left flex items-center p-2 hover:bg-gray-700 transition-colors"
            >
              <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-semibold text-sm">{user.username}</p>
                <p className="text-xs text-gray-400">{user.fullName}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
