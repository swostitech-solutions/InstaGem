import axios from './axios';

interface VideoFilters {
  status?: string;
  ageGroup?: string;
  category?: string;
  page?: number;
}

// Get all videos (admin)
export const getAllVideos = async (filters: VideoFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.ageGroup) params.append('ageGroup', filters.ageGroup);
  if (filters.category) params.append('category', filters.category);
  if (filters.page) params.append('page', filters.page.toString());
  
  const response = await axios.get(`/admin/videos?${params.toString()}`);
  return response.data;
};

// Upload video
export const uploadVideo = async (formData) => {
  const response = await axios.post('/admin/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update video
export const updateVideo = async (id, data) => {
  const response = await axios.put(`/admin/videos/${id}`, data);
  return response.data;
};

// Delete video
export const deleteVideo = async (id) => {
  const response = await axios.delete(`/admin/videos/${id}`);
  return response.data;
};

// Publish video
export const publishVideo = async (id) => {
  const response = await axios.patch(`/admin/videos/${id}/publish`);
  return response.data;
};

// Unpublish video
export const unpublishVideo = async (id) => {
  const response = await axios.patch(`/admin/videos/${id}/unpublish`);
  return response.data;
};

// Get video analytics
export const getVideoAnalytics = async (id) => {
  const response = await axios.get(`/admin/videos/${id}/analytics`);
  return response.data;
};
