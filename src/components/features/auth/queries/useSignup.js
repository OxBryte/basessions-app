import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignup } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();

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
      localStorage.setItem("token", data.token);

        //redirect to dashboard
        window.location.href = "/complete-profile";
    },
    onError(error) {
      console.log(error);

      toast.error(`${error.message}`);
    },
  });
  return { signupFn, isPending };
};
