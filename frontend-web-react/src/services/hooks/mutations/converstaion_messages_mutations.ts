import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { queryClient } from "../../..";
import { getConversationMessagesParamInterface } from "../../../interfaces/services/apis/get_conversation_messages_api_param";
import { getConversationMessagesResponseInterface } from "../../../interfaces/responses/get_conversation_message_response";
import { getConversationMessagesApi } from "../../apis/conversations/get_messages";
import { NavigateFunction } from "react-router-dom";

const useConversationMessages = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<
    getConversationMessagesResponseInterface,
    Error,
    getConversationMessagesParamInterface
  >({
    mutationFn: getConversationMessagesApi,
    onSuccess(data) {
      queryClient.setQueryData(["conversations", data.conversation_id], data);
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }
        if (error.status === 400) {
          if (error.response?.data.result === "same_user") {
            showPopupText(setPopupProps, "Same user");
            return;
          }
        } else if (error.status === 401) {
          if (error.response?.data.result === "user_not_in_conversation") {
            showPopupText(
              setPopupProps,
              "Session ended, please login again",
              () => navigate("/")
            );
          } else if (
            error.response?.data.result === "user_not_in_conversation"
          ) {
            showPopupText(setPopupProps, "Method not allowed", () =>
              navigate("/")
            );
          }
          return;
        } else if (error.status === 404) {
          if (error.response?.data.result === "user_not_found") {
            showPopupText(setPopupProps, "User not found");
          } else if (error.response?.data.result === "other_user_not_found") {
            showPopupText(setPopupProps, "Other user not found");
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
          } else if (
            error.response?.data.result === "other_user_not_verified"
          ) {
            showPopupText(setPopupProps, "Other user is not verified yet.");
          } else if (
            error.response?.data.result === "other_user_account_deleted"
          ) {
            showPopupText(setPopupProps, "Other user accoutn is deleted.");
          }
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    },
  });

export default useConversationMessages;
