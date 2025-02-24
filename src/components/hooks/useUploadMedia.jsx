import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uploadMedia } from "../services/apiProfile";

export const useUploadMedia = () => {
  const navigate = useNavigate();

  const { mutateAsync: uploadMediaFn, isPending } = useMutation({
    mutationKey: ["uploadMedia"],
    mutationFn: async (body) => {
      return await uploadMedia(body);
    },
    onSuccess(data) {
      console.log(data);
      toast.success(`${data.message}`);

      //redirect to dashboard
      navigate("/");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { uploadMediaFn, isPending };
};
