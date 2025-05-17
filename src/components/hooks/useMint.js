import { useMutation, useQuery } from "@tanstack/react-query";
import { getMintedMedia, mintedVideo } from "../services/apiMedia";
import toast from "react-hot-toast";

export const useMintVideo = () => {
  const { mutateAsync: mintFn, isPending } = useMutation({
    mutationKey: ["mintedVideo"],
    mutationFn: async (mediaId) => {
      return await mintedVideo(mediaId);
    },
    onSuccess(data) {
      console.log(data);
      toast.success("Minted successfully");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { mintFn, isPending };
};


export function useMintedMedia() {
  const { isPending: isLoadingMintedVideo, data: mintedMedias } = useQuery({
    queryKey: ["mintedVideo"],
    queryFn: getMintedMedia,
  });

  return { isLoadingMintedVideo, mintedMedias };
}