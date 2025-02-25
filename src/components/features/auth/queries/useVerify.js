import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyUser } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useVerify = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: verifyFn, isPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: async (body) => {
      return await verifyUser(body);
    },
    onSuccess(data) {
      console.log(data);
      toast.success(`${data.message}`);

      //set user data and session in global state
      queryClient.setQueryData(["user"], data.data.user);

      //save token in local storage
      localStorage.setItem("token", data.data.token);
      document.cookie = `token=${data.data.token}; path=/; max-age=604800; Secure; SameSite=Strict;`;

      //redirect to dashboard
      navigate("/complete-profile");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { verifyFn, isPending };
};
