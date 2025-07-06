import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../apis/auth/login";
import { loginBodyInterface } from "../../../interfaces/requests/login_request";
import { loginResponseInterface } from "../../../interfaces/responses/login_response";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { queryClient } from "../../..";

const useLogin = (setPopupProps: SetPopupType) =>
  useMutation<loginResponseInterface, Error, loginBodyInterface>({
    mutationFn: loginApi,
    onSuccess(data) {
      queryClient.setQueryData(["user_data"], data);
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 401) {
          showPopupText(setPopupProps, "Wrong email or password");
          return;
        } else if (error.status === 405) {
          if (error.response?.data.result === "user_not_verified") {
            showPopupText(
              setPopupProps,
              "You are not verified yet. Please open your inbox and activate your account"
            );
          } else if (error.response?.data.result === "user_account_deleted") {
            showPopupText(setPopupProps, "Use account deleted");
          }
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    },
  });

export default useLogin;
