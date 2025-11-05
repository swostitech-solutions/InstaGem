import React, { useState } from 'react';
import * as adminAPI from '../api/adminAPI';

interface VideoUploadFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ onClose, onSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ageGroup: '1-5',
    category: 'Math',
    learningObjectives: [''],
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const categories = [
    'Math',
    'Science',
    'Reading',
    'Writing',
    'Language',
    'Music',
    'Art',
    'Social Studies',
    'Life Skills',
    'Physical Education',
    'Technology',
    'Critical Thinking',
  ];

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...formData.learningObjectives];
    newObjectives[index] = value;
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  const addObjective = () => {
    setFormData({
      ...formData,
      learningObjectives: [...formData.learningObjectives, ''],
    });
  };

  const removeObjective = (index: number) => {
    const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
    setFormData({ ...formData, learningObjectives: newObjectives });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile || !thumbnailFile) {
      alert('Please select both video and thumbnail files');
      return;
    }

    setUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('video', videoFile);
      uploadData.append('thumbnail', thumbnailFile);
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('ageGroup', formData.ageGroup);
      uploadData.append('category', formData.category);
      uploadData.append(
        'learningObjectives',
        JSON.stringify(formData.learningObjectives.filter((obj) => obj.trim()))
      );

      await adminAPI.uploadVideo(uploadData);
      alert('Video uploaded successfully!');
      onSuccess();
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Error uploading video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Upload Video</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            disabled={uploading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video File *
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
            {videoPreview && (
              <video src={videoPreview} controls className="mt-3 w-full rounded-lg" />
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            />
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt="Thumbnail preview" className="mt-3 w-full rounded-lg" />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="e.g., Learning Numbers 1-10"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Describe what kids will learn..."
              rows={4}
              required
            />
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Age Group *
            </label>
            <select
              value={formData.ageGroup}
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="1-5">Ages 1-5 (Preschool)</option>
              <option value="5-10">Ages 5-10 (Elementary)</option>
              <option value="10-13">Ages 10-13 (Middle School)</option>
              <option value="13-17">Ages 13-17 (High School)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Learning Objectives
            </label>
            {formData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
                  placeholder={`Objective ${index + 1}`}
                />
                {formData.learningObjectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addObjective}
              className="text-purple-400 hover:text-purple-300 text-sm transition"
            >
              + Add Objective
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;
