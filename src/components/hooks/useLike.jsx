import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateLike } from "../services/apiMedia";

export const useLike = () => {
  const { mutate: likeFn, isPending } = useMutation({
    mutationFn: async ({ mediaId, status }) => {
      const response = await updateLike(mediaId, { status });
      return { mediaId, status, response };
    },

    onError: (error) => {
      // Only revert if we have the previous data and context

      toast.error(error.message || "Failed to update like status");
    },
    onSuccess: (data) => {
      toast.success(data.status ? "Post liked!" : "Post unliked!");
    },
  });

  return { likeFn, isPending };
};
