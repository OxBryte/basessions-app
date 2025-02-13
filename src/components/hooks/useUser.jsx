import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { getMedias, getUserMedias } from "../services/apiMedia";

export function useUser() {
  const token = localStorage.getItem("token");
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: token !== null };
}

export function useMedia() {
  const { isPending: isLoading, data: medias } = useQuery({
    queryKey: ["medias"],
    queryFn: getMedias,
  });

  return { isLoading, medias };
}

export function useUserMedia(userId) {
  const { isPending: isLoading, data: userMedia } = useQuery({
    queryKey: ["userMedia", userId],
    queryFn: () => getUserMedias(userId),
    enabled: !!userId,
  });

  return { isLoading, userMedia };
}
