import { useMutation } from "@tanstack/react-query";
import { SetPopupType } from "../../../interfaces/general_types";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { NavigateFunction, useFetcher } from "react-router-dom";
import { deleteConversationApi } from "../../apis/conversations/delete_conversation";
import { deleteConversationResponseInterface } from "../../../interfaces/responses/delete_conversation_response";
import { deleteConversationApiParamInterface } from "../../../interfaces/services/apis/delete_conversation_api_param";

const useDeleteConversation = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<
    deleteConversationResponseInterface,
    Error,
    deleteConversationApiParamInterface
  >({
    mutationFn: deleteConversationApi,
    onSuccess(data) {
      if (data.result === "deleted") {
        // Delete conversation from cache
      }
      throw new Error();
    },
    onError(error) {
      // Handle error case
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 400) {
          showPopupText(setPopupProps, "Deleting same user conversation");
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
          showPopupText(setPopupProps, "Conversation already deleted");
          return;
        } else if (error.status === 404) {
          if (error.response?.data.result === "user_not_found") {
            showPopupText(setPopupProps, "User not found");
          } else if (error.response?.data.result === "other_user_not_found") {
            showPopupText(setPopupProps, "Other user is not found");
          } else if (error.response?.data.result === "conversation_not_found") {
            showPopupText(setPopupProps, "Conversation not found");
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
            showPopupText(setPopupProps, "Other user is not verified");
          }
          return;
        } else if (error.status === 410) {
          showPopupText(setPopupProps, "Other user is deleted");
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    },
  });

export default useDeleteConversation;
