import axios from './axios';

// Get published videos (age-filtered feed)
export const getVideos = async (ageGroup?: string, page = 1) => {
  const params = new URLSearchParams();
  if (ageGroup) params.append('ageGroup', ageGroup);
  params.append('page', page.toString());
  params.append('limit', '6');
  
  const response = await axios.get(`/videos?${params.toString()}`);
  return response.data;
};

// Get single video
export const getVideo = async (id: string) => {
  const response = await axios.get(`/videos/${id}`);
  return response.data;
};

// Like/unlike video
export const likeVideo = async (id: string) => {
  const response = await axios.post(`/videos/${id}/like`);
  return response.data;
};

// Add comment
export const addComment = async (id: string, text: string) => {
  const response = await axios.post(`/videos/${id}/comment`, { text });
  return response.data;
};

// Track view
export const trackView = async (id: string) => {
  const response = await axios.post(`/videos/${id}/view`);
  return response.data;
};
