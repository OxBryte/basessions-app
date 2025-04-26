import { useQuery } from "@tanstack/react-query";
import { getCreatorProfile, getCurrentUser } from "../services/apiAuth";
import {
  getLikedMedia,
  getMedias,
  getSingleMedia,
  getUserMedias,
} from "../services/apiMedia";

export function useUser() {
  const token = document.cookie.includes("token=")
    ? document.cookie.split("token=")[1].split(";")[0]
    : null;
  const {
    isPending: isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, error, isAuthenticated: token !== null };
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

export function useSingleMedia(mediaId) {
  const { isPending: isLoading, data: singleMedia } = useQuery({
    queryKey: ["singleMedia", mediaId],
    queryFn: () => getSingleMedia(mediaId),
    enabled: !!mediaId,
  });

  return { isLoading, singleMedia };
}

export function useCreatorProfile(creatorId) {
  const { isPending: isLoading, data: creatorProfile } = useQuery({
    queryKey: ["creatorProfile", creatorId],
    queryFn: () => getCreatorProfile(creatorId),
    enabled: !!creatorId,
  });

  return { isLoading, creatorProfile };
}

export function useLikedMedia() {
  const { isPending: isLoading, data: likedMedia } = useQuery({
    queryKey: ["userMedia"],
    queryFn: () => getLikedMedia(),
    // enabled: !!userId,
  });

  return { isLoading, likedMedia };
}
