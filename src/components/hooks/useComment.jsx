import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getRepliedComment, postComment } from "../services/apiMedia";

export const useComment = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: commentFn, isPending } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async ({ comment, mediaId, parent_id }) => {
      return await postComment({ comment, parent_id }, mediaId);
    },
    onSuccess() {
      // console.log(data);
      // refetch comments
      queryClient.invalidateQueries(["comments"]);

      toast.success("Comment sent successfully");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { commentFn, isPending };
};

export function useGetRepliedComment(mediaId, parentId) {
  const { isPending: isLoading, data: repliedComment } = useQuery({
    queryKey: ["repliedComment", mediaId, parentId],
    queryFn: () => getRepliedComment(mediaId, parentId),
    enabled: !!mediaId,
  });

  return { isLoading, repliedComment };
}
