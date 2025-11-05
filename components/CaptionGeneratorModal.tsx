import React, { useState, useCallback, useMemo } from 'react';
import { generateCaption } from '../services/geminiService';
import type { Post } from '../types';
import { UserSuggestions } from './UserSuggestions';
import * as uploadAPI from '../api/uploadAPI';
import * as postsAPI from '../api/postsAPI';
import { useAuth } from '../context/AuthContext';

interface CaptionGeneratorModalProps {
  onClose: () => void;
  onPostCreated: (post: Omit<Post, 'id'>) => void;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // remove data:mime/type;base64, prefix
        resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });


export const CaptionGeneratorModal: React.FC<CaptionGeneratorModalProps> = ({ onClose, onPostCreated }) => {
  const { user, isAuthenticated } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestionQuery, setSuggestionQuery] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setCaption('');
      setError(null);
      setSuggestionQuery(null);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCaption(value);

    const words = value.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@')) {
      setSuggestionQuery(lastWord.substring(1));
    } else {
      setSuggestionQuery(null);
    }
  };

  const handleSelectUser = (username: string) => {
    const words = caption.split(/\s+/);
    words[words.length - 1] = `@${username}`;
    setCaption(words.join(' ') + ' ');
    setSuggestionQuery(null);
  };

  const handleGenerateCaption = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const base64Image = await fileToBase64(imageFile);
      const generated = await generateCaption(base64Image, imageFile.type);
      setCaption(generated);
    } catch (err) {
      setError("Failed to generate caption. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (!imageFile || !imagePreview) return;

    if (!isAuthenticated || !user) {
      // For non-authenticated users, just create local post
      onPostCreated({
        user: {
          username: 'guest',
          avatarUrl: 'https://picsum.photos/seed/default/100/100',
          fullName: 'Guest User',
          bio: '',
          followers: 0,
          following: 0,
        },
        mediaUrl: imagePreview,
        mediaType: 'image',
        caption,
        likes: 0,
        comments: [],
        timestamp: 'Just now',
      });
      onClose();
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Upload image to Cloudinary
      const imageUrl = await uploadAPI.uploadImage(imageFile);

      // Create post via API
      await postsAPI.createPost({ imageUrl, caption, mediaType: 'image' });

      // Notify parent to refresh posts
      onPostCreated({
        user: {
          username: user.username,
          avatarUrl: user.avatarUrl,
          fullName: user.fullName,
          bio: user.bio || '',
          followers: 0,
          following: 0,
        },
        mediaUrl: imageUrl,
        mediaType: 'image',
        caption,
        likes: 0,
        comments: [],
        timestamp: 'Just now',
      });

      onClose();
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md text-white flex flex-col max-h-[90vh]">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Create new post with AI</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </header>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {!imagePreview ? (
             <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
            </div> 
          ) : (
            <>
              <img src={imagePreview} alt="Preview" className="w-full max-h-80 object-contain rounded-lg" />
              <div className="relative">
                {suggestionQuery !== null && (
                  <UserSuggestions 
                    query={suggestionQuery} 
                    onSelectUser={handleSelectUser} 
                  />
                )}
                <textarea
                  value={caption}
                  onChange={handleCaptionChange}
                  placeholder={isLoading ? "Generating caption..." : "Write a caption..."}
                  className="w-full h-24 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleGenerateCaption}
                disabled={isLoading}
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-500 transition-colors"
              >
                {isLoading ? 'Generating...' : '✨ Generate Caption with Gemini'}
              </button>
            </>
          )}
           {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        
        <footer className="p-4 border-t border-gray-700 mt-auto">
            <button
                onClick={handlePost}
                disabled={!imagePreview || caption.length === 0 || isUploading}
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? '⏳ Uploading...' : 'Share'}
              </button>
        </footer>
      </div>
    </div>
  );
};
