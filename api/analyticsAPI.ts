import axios from '../api/axios';

// Track video watch progress
export const trackWatch = async (videoId: string, watchedDuration: number, totalDuration: number) => {
  const response = await axios.post('/analytics/watch', {
    videoId,
    watchedDuration,
    totalDuration
  });
  return response.data;
};

// Get child's watch history
export const getChildWatchHistory = async (childId: string, page = 1, limit = 20) => {
  const response = await axios.get(`/analytics/child/${childId}/history`, {
    params: { page, limit }
  });
  return response.data;
};

// Get child's learning overview
export const getChildOverview = async (childId: string, timeRange = '7') => {
  const response = await axios.get(`/analytics/child/${childId}/overview`, {
    params: { timeRange }
  });
  return response.data;
};

// Get detailed video analytics for child
export const getChildVideoAnalytics = async (childId: string, videoId: string) => {
  const response = await axios.get(`/analytics/child/${childId}/video/${videoId}`);
  return response.data;
};

// Get category-wise progress
export const getChildCategoryProgress = async (childId: string) => {
  const response = await axios.get(`/analytics/child/${childId}/categories`);
  return response.data;
};

// Get achievements and streaks
export const getChildAchievements = async (childId: string) => {
  const response = await axios.get(`/analytics/child/${childId}/achievements`);
  return response.data;
};

// Get all children overview for parent
export const getParentChildrenOverview = async () => {
  const response = await axios.get('/analytics/parent/children');
  return response.data;
};
