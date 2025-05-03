import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followCreator } from "../services/apiProfile";
import toast from "react-hot-toast";

export const useFollowCreator = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: followFn, isPending: isFollowing } = useMutation({
    mutationKey: ["followCreator"],
    mutationFn: async (userId) => {
      return await followCreator(userId);
    },
    onSuccess: (data) => {
      // toast.success(`${data.message}`);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast(error?.message);
    },
  });

  return { followFn, isFollowing };
};
