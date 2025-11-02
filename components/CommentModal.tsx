import React, { useState, useEffect, useRef } from 'react';
import type { Post as PostType } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { currentUser } from '../constants';
import { UserSuggestions } from './UserSuggestions';

interface CommentModalProps {
  post: PostType;
  onClose: () => void;
  onAddComment: (commentText: string) => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ post, onClose, onAddComment }) => {
    const [commentText, setCommentText] = useState('');
    const [suggestionQuery, setSuggestionQuery] = useState<string | null>(null);
    const commentsContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCommentText(value);

        const words = value.split(/\s+/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith('@')) {
            setSuggestionQuery(lastWord.substring(1));
        } else {
            setSuggestionQuery(null);
        }
    };

    const handleSelectUser = (username: string) => {
        const words = commentText.split(/\s+/);
        words[words.length - 1] = `@${username}`;
        setCommentText(words.join(' ') + ' ');
        setSuggestionQuery(null);
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddComment(commentText);
        setCommentText('');
        setSuggestionQuery(null);
    };

    useEffect(() => {
        // Scroll to the bottom of the comments list when it updates or opens
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [post.comments]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col justify-end" onClick={onClose}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 rounded-t-2xl shadow-xl w-full max-w-md mx-auto text-white flex flex-col h-[80vh] animate-slide-in-up"
            >
                <header className="flex items-center justify-center p-4 border-b border-gray-700 relative flex-shrink-0">
                    <h2 className="text-base font-bold">Comments</h2>
                    <button onClick={onClose} className="absolute right-4 text-gray-400 hover:text-white">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </header>
                
                <div ref={commentsContainerRef} className="p-4 space-y-4 overflow-y-auto flex-grow">
                    {/* Post Caption */}
                    <div className="flex items-start space-x-3 pb-4 border-b border-gray-800">
                        <img src={post.user.avatarUrl} alt={post.user.username} className="w-8 h-8 rounded-full" />
                        <div className="text-sm flex-grow">
                            <p>
                                <span className="font-semibold">{post.user.username}</span>
                                <span className="ml-2 text-gray-300">{post.caption}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
                        </div>
                    </div>

                    {/* Comments List */}
                    {post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <img src={`https://picsum.photos/seed/${comment.user}/40/40`} alt={comment.user} className="w-8 h-8 rounded-full" />
                                <p className="text-sm">
                                    <span className="font-semibold">{comment.user}</span>
                                    <span className="ml-2 text-gray-300">{comment.text}</span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No comments yet.</p>
                    )}
                </div>
                
                <form onSubmit={handleSubmit} className="p-2.5 border-t border-gray-700 mt-auto flex-shrink-0 relative">
                     {suggestionQuery !== null && (
                        <UserSuggestions
                            query={suggestionQuery}
                            onSelectUser={handleSelectUser}
                            isCommentInput={true}
                        />
                    )}
                    <div className="flex items-center space-x-2">
                        <img src={currentUser.avatarUrl} alt="Your avatar" className="w-9 h-9 rounded-full" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder={`Comment as ${currentUser.username}...`}
                            className="flex-grow bg-gray-800 border-none rounded-full px-4 py-2 focus:ring-0 outline-none placeholder-gray-500"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!commentText.trim()}
                            className="font-semibold text-blue-500 disabled:text-gray-600 disabled:cursor-not-allowed px-2"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
