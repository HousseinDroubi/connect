import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../apis/login";
import { loginBodyInterface } from "../../../interfaces/requests/login_request";
import { loginResponseInterface } from "../../../interfaces/responses/login_response";

const useLogin = () =>
  useMutation<loginResponseInterface, Error, loginBodyInterface>({
    mutationFn: loginApi,
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.warn(error);
    },
  });

export default useLogin;
