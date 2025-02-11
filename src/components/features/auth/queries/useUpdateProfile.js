import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/apiProfile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: updateProfileFn, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (body) => {
      return await updateProfile(body);
    },
    onSuccess(data) {
      console.log(data);
      toast.success(`${data.message}`);

      //set user data and session in global state
      queryClient.setQueryData(["user"], data.data.user);

      //redirect to dashboard
      navigate("/");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { updateProfileFn, isPending };
};
