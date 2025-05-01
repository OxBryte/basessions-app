import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSearch, searchMedia } from "../services/apiSearch";
import toast from "react-hot-toast";

export function useSearch() {
  const {
    isPending: isLoadingSearch,
    data: search,
    error,
  } = useQuery({
    queryKey: ["search"],
    queryFn: getSearch,
  });

  return { isLoadingSearch, error, search };
}

export const useSearchSubmit = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: searchFn, isPending } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (q) => {
      return await searchMedia(q);
    },
    onSuccess(data) {
      // console.log(data);
      // toast(`${data.message}`, { icon: "🚀" });

      //set user data and session in global state
      queryClient.setQueryData(["search"], data);
    },
    onError(error) {
      toast(`${error.message}`, { icon: "🔥" });
    },
  });
  return { searchFn, isPending };
};
