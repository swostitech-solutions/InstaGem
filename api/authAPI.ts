import API from './axios';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    bio: string;
    token: string;
  };
}

// Register new user
export const register = async (data: RegisterData) => {
  const response = await API.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Login user
export const login = async (data: LoginData) => {
  const response = await API.post<AuthResponse>('/auth/login', data);
  return response.data;
};

// Logout user
export const logout = async () => {
  const response = await API.post('/auth/logout');
  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};
