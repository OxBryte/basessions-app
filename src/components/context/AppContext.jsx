import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const apiURL = import.meta.env.VITE_BASE_URL;
  // Watch for changes in localStorage (handles auto-login)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      queryClient.invalidateQueries(["user"]);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [queryClient]);

  // Fetch user from API (Modify this based on your backend)
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", token], // Re-fetch when token changes
    queryFn: async () => {
      if (!token) return null;

      const res = await axios.get(`${apiURL}user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token"); // Clear invalid token
        setToken(null);
        return null;
      }

      return res.json();
    },
    enabled: !!token, // Only fetch if there's a token
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.invalidateQueries(["user"]);
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
