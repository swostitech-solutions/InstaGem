import API from "./axios";

export interface CreatePostData {
  imageUrl: string;
  caption: string;
  mediaType?: "image" | "video";
}

// Get all posts (feed)
export const getPosts = async (page = 1, limit = 10) => {
  const response = await API.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single post
export const getPost = async (postId: string) => {
  const response = await API.get(`/posts/${postId}`);
  return response.data;
};

// Create new post
export const createPost = async (data: CreatePostData) => {
  const response = await API.post("/posts", data);
  return response.data;
};

// Delete post
export const deletePost = async (postId: string) => {
  const response = await API.delete(`/posts/${postId}`);
  return response.data;
};

// Like/Unlike post
export const likePost = async (postId: string) => {
  const response = await API.post(`/posts/${postId}/like`);
  return response.data;
};

// Add comment to post
export const addComment = async (postId: string, text: string) => {
  const response = await API.post(`/posts/${postId}/comment`, { text });
  return response.data;
};

// Get user posts
export const getUserPosts = async (userId: string) => {
  const response = await API.get(`/posts/user/${userId}`);
  return response.data;
};
