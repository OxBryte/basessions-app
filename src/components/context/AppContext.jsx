import { createContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useMedia, useUser } from "../hooks/useUser";

// Create Auth Context
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const { isLoading, user } = useUser();
  const { isLoading: loading } = useMedia();
  const queryClient = useQueryClient();

  const [, setToken] = useState(() => {
    const match = document.cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
  });

  const logout = () => {
    // Remove token cookie
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setToken(null);
    // Invalidate user-related queries
    queryClient.invalidateQueries(["user"]);
    // Redirect to login page
    window.location.href = "/";
  };


  if (loading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <img src="session_logo.svg" alt="" className="animate-pulse" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
