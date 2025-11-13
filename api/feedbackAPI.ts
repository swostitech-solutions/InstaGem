import axios from "./axios";

// Submit video feedback
export const submitVideoFeedback = async (
  videoId: string,
  feedbackData: {
    starRating: number;
    emojiRating: string;
    topicsLearned: string[];
    comment: string;
    completionPercentage: number;
    responseTime: number;
  }
) => {
  const response = await axios.post(`/feedback/video/${videoId}`, feedbackData);
  return response.data;
};

// Get user gamification stats
export const getUserGamification = async (userId: string) => {
  const response = await axios.get(`/feedback/gamification/${userId}`);
  return response.data;
};

// Get all available badges
export const getAllBadges = async () => {
  const response = await axios.get("/feedback/badges");
  return response.data;
};

// Get feedback analytics (Admin only)
export const getFeedbackAnalytics = async (params?: {
  videoId?: string;
  startDate?: string;
  endDate?: string;
  ageGroup?: string;
}) => {
  const queryString = new URLSearchParams(params as any).toString();
  const response = await axios.get(`/feedback/analytics?${queryString}`);
  return response.data;
};
