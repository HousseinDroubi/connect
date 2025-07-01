import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { deleteAccountResponseInterface } from "../../../interfaces/responses/delete_account_response";
import { deleteAccountApi } from "../../apis/delete_account";
import { NavigateFunction } from "react-router-dom";

const useDeleteAccount = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<deleteAccountResponseInterface, Error, string>({
    mutationFn: deleteAccountApi,
    onSuccess(data) {
      //
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 401) {
          showPopupText(
            setPopupProps,
            "Session ended. Please login again.",
            () => {
              navigate("/");
            }
          );
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

export default useDeleteAccount;
