import API from './axios';

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
}

// Get user profile
export const getUserProfile = async (userId: string) => {
  const response = await API.get(`/users/${userId}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId: string, data: UpdateProfileData) => {
  const response = await API.put(`/users/${userId}`, data);
  return response.data;
};

// Follow/Unfollow user
export const followUser = async (userId: string) => {
  const response = await API.post(`/users/${userId}/follow`);
  return response.data;
};

// Get user followers
export const getUserFollowers = async (userId: string) => {
  const response = await API.get(`/users/${userId}/followers`);
  return response.data;
};

// Get user following
export const getUserFollowing = async (userId: string) => {
  const response = await API.get(`/users/${userId}/following`);
  return response.data;
};

// Search users
export const searchUsers = async (query: string) => {
  const response = await API.get(`/users/search?q=${query}`);
  return response.data;
};
