import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postComment } from "../services/apiMedia";

export const useComment = () => {
  const { mutateAsync: commentFn, isPending } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async ({ comment, mediaId }) => {
      return await postComment({ comment }, mediaId);
    },
    onSuccess(data) {
      console.log(data);
      toast.success("Comment sent successfully");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { commentFn, isPending };
};
