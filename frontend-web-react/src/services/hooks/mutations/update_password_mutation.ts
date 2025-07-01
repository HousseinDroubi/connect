import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { updatePasswordResponseInterface } from "../../../interfaces/responses/update_password_response";
import { updatePasswordApiParamInterface } from "../../../interfaces/services/apis/update_password_api_param";
import { updatePasswordApi } from "../../apis/update_password";

const useUpdatePassword = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<
    updatePasswordResponseInterface,
    Error,
    updatePasswordApiParamInterface
  >({
    mutationFn: updatePasswordApi,
    onSuccess(data) {
      if (data.result !== "password_updated") throw new Error();
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }
        if (error.status === 400) {
          showPopupText(
            setPopupProps,
            "Old password is the same as new password!"
          );
          return;
        } else if (error.status === 401) {
          if (error.response?.data.result === "invalid_id") {
            showPopupText(
              setPopupProps,
              "Session ended. Please login again.",
              () => {
                navigate("/");
              }
            );
          } else if (error.response?.data.result === "old_password_wrong") {
            showPopupText(setPopupProps, "Old password is wrong");
          }
          return;
        } else if (error.status === 404) {
          showPopupText(setPopupProps, "User not found");
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

export default useUpdatePassword;
