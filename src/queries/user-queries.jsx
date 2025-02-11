import axiosInstance from "../components/libs/api";
import { useAuth } from "../components/hooks/useAuth";

const useGetUser = () => {
  const { setUser } = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"], // Re-fetch when token changes
    queryFn: async () => {
      // if (!token) return null;

      // const res = await fetch(`${apiURL}user/profile`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // if (!res.ok) {
      //   localStorage.removeItem("token"); // Clear invalid token
      //   setToken(null);
      //   return null;
      // }

      // return res.json();
      const res = await axiosInstance.get("user/profile");
      return res.data;
    },
    enabled: !!token,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  return { user, isLoading };
};
