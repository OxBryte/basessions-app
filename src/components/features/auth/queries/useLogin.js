import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userLogin } from "../../../services/apiAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: loginFn, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (body) => {
      return await userLogin(body);
    },
    onSuccess(data) {
      console.log(data);
      toast(`${data.message}`, { icon: "🚀" });

      //set user data and session in global state
      queryClient.setQueryData(["user"], data.data.user);

      //save token in local storage
      localStorage.setItem("token", data.token);
    },
    onError(error) {
      toast(`${error.message}`, { icon: "🔥" });
    },
  });
  return { loginFn, isLoading };
};
