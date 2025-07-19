import { useMutation } from "@tanstack/react-query";
import { SetPopupType } from "../../../interfaces/general_types";
import { deleteMessageResponseInterface } from "../../../interfaces/responses/delete_message_response";
import { deleteMessageApi } from "../../apis/message/delete_message";
import { deleteMessageApiParamInterface } from "../../../interfaces/services/apis/delete_message_api_param";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { NavigateFunction } from "react-router-dom";

const useDeleteMessage = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<
    deleteMessageResponseInterface,
    Error,
    deleteMessageApiParamInterface
  >({
    mutationFn: deleteMessageApi,
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 400) {
          showPopupText(setPopupProps, "Message id is invalid");
        } else if (error.status === 401) {
          showPopupText(
            setPopupProps,
            "Session ended. Please login again.",
            () => {
              navigate("/");
            }
          );
          return;
        } else if (error.status === 403) {
          if (error.response?.data === "message_deleted") {
            showPopupText(setPopupProps, "Message deleted");
          } else if (error.response?.data === "message_deleted_for_others") {
            showPopupText(setPopupProps, "Message deleted for others");
          }
          return;
        } else if (error.status === 404) {
          if (error.response?.data.result === "user_not_found") {
            showPopupText(setPopupProps, "User not found");
          } else if (error.response?.data.result === "message_not_found") {
            showPopupText(setPopupProps, "Message not found");
          }
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

export default useDeleteMessage;
