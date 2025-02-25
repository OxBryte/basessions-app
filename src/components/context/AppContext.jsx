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
  const [, setToken] = useState(document.cookie.includes('token=') || null) ;
  

  const logout = () => {
    // localStorage.removeItem("token");
    // setToken(null);
    // queryClient.invalidateQueries(["user"]);
    // window.location.href = "/"; // Redirect to login page
  };

  // // Check for error or token expiration
  // if (error || !localStorage.getItem("token")) {
  //   logout(); // Call logout to handle redirection
  //   return null; // Prevent rendering of children
  // }

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
