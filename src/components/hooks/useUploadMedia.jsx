import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { deleteMedia, uploadMedia } from "../services/apiProfile";

export const useUploadMedia = (setOpenModal, setData) => {
  // const navigate = useNavigate();

  const { mutateAsync: uploadMediaFn, isPending } = useMutation({
    mutationKey: ["uploadMedia"],
    mutationFn: async (body) => {
      return await uploadMedia(body);
    },
    onSuccess(data) {
      // console.log(data);
      setData(data);
      toast.success(`${data.message}`);
      setOpenModal(true);

      //redirect to dashboard
      // navigate("/");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { uploadMediaFn, isPending };
};

export const useDeleteMedia = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMediaFn, isPending } = useMutation({
    mutationKey: ["deleteMedia"],
    mutationFn: async (mediaId) => {
      return await deleteMedia(mediaId);
    },
    onSuccess(data) {
      // console.log(data);
      toast.success(`${data?.message}`);
      queryClient.invalidateQueries(["userMedia"]);
      //redirect to dashboard
      // navigate("/");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { deleteMediaFn, isPending };
};
