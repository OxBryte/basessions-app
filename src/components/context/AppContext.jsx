import { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";


// Create Auth Context
const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const apiURL = import.meta.env.VITE_BASE_URL;

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", token], // Re-fetch when token changes
    queryFn: async () => {
      if (!token) return null;

      const res = await fetch(`${apiURL}user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // localStorage.removeItem("token"); // Clear invalid token
        // setToken(null);
        return null;
      }

      return res.json();
    },
    enabled: !!token,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", token], data);
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.invalidateQueries(["user"]);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context

