import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignup } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: signupFn, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body) => {
      return await userSignup(body);
    },
    onSuccess(data) {
      //   console.log(data);
      toast.success(`${data.message}`);

      //set user data and session in global state
      queryClient.setQueryData(["user"], data.data.user);

      //save token in local storage
      localStorage.setItem("userEmail", data.data.user.email);
      localStorage.setItem("token", data.data.token);
      document.cookie = `token=${data.data.token}; path=/; max-age=604800; Secure; SameSite=Strict;`;

      //redirect to dashboard
      navigate("/verify");
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { signupFn, isPending };
};
