import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userLogin } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const {setUser}= useAuth()
  const { mutateAsync: loginFn, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (body) => {
      return await userLogin(body);
    },
    onSuccess(data) {
      console.log(data);
      toast(`${data.message}`, { icon: "🚀" });

      //set user data and session in global state
      queryClient.setQueryData(["user"], data);
      setUser(data.data)

      //save token in local storage
      localStorage.setItem("token", data.data.token);
      navigate("/")
    },
    onError(error) {
      toast(`${error.message}`, { icon: "🔥" });
    },
  });
  return { loginFn, isPending };
};
