import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import * as authAPI from "../api/authAPI";

interface User {
  _id: string;
  username?: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  childAge?: number;
  parentEmail?: string;
  favoriteColor?: string;
  isAdmin?: boolean;
  isParent?: boolean;
  childId?: string;
  likedVideos?: string[];
  followers?: number;
  following?: number;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  childAge?: number;
  parentEmail?: string;
  favoriteColor?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize auth state synchronously from localStorage to prevent flicker
  const getInitialAuth = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        return {
          token: storedToken,
          user: JSON.parse(storedUser),
        };
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    return { token: null, user: null };
  };

  const initialAuth = getInitialAuth();

  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [loading] = useState(false); // Always false - we init synchronously from localStorage

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, ...userData } = response.data;

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Check if this is a parent login and redirect to dashboard
      if (response.isParentLogin || userData.isParent) {
        window.location.href = "/parent-dashboard";
      } else if (userData.isAdmin) {
        window.location.href = "/admin";
      }
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error message:", error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data);
      const { token: newToken, ...userData } = response.data;

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.error("Register error:", error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.logout().catch(console.error);

    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear(); // Clear all session data
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user && !!token,
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
