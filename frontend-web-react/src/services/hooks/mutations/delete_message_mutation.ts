import { useMutation } from "@tanstack/react-query";
import { SetPopupType } from "../../../interfaces/general_types";
import { deleteMessageResponseInterface } from "../../../interfaces/responses/delete_message_response";
import { deleteMessageApi } from "../../apis/message/delete_message";
import { deleteMessageApiParamInterface } from "../../../interfaces/services/apis/delete_message_api_param";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { NavigateFunction } from "react-router-dom";
import { queryClient } from "../../..";
import { cloneDeep } from "lodash";
import { getConversationMessagesResponseInterface } from "../../../interfaces/responses/get_conversation_message_response";

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
      if (data.result === "message_deleted") {
        const user_data: any = queryClient.getQueryData(["user_data"]);

        if (!user_data || !user_data.conversations) {
          return;
        }

        const conversations = queryClient.getQueriesData({
          queryKey: ["conversations"],
          exact: false,
        });

        let new_message;

        conversations.map(([queryKey, data_cache]) => {
          const conversation =
            data_cache as getConversationMessagesResponseInterface;
          if (conversation.conversation_id === data.message_conversation_id) {
            const index = conversation.messages.findIndex(
              (message) => message._id === data.message_id
            );

            if (index !== -1) {
              const updatedMessages = [...conversation.messages];
              updatedMessages.splice(index, 1);

              const updated_conversation = {
                ...conversation,
                messages: updatedMessages,
              };

              queryClient.setQueryData(queryKey, updated_conversation);

              if (updatedMessages.length !== 0) {
                new_message = {
                  _id: updatedMessages[updatedMessages.length - 1]._id,
                  sender: updatedMessages[updatedMessages.length - 1].sender,
                  receiver:
                    updatedMessages[updatedMessages.length - 1].receiver,
                  is_text: updatedMessages[updatedMessages.length - 1].is_text,
                  content: updatedMessages[updatedMessages.length - 1].content,
                  conversation_id:
                    updatedMessages[updatedMessages.length - 1].conversation_id,
                  created_at:
                    updatedMessages[updatedMessages.length - 1].created_at,
                  deleted:
                    updatedMessages[updatedMessages.length - 1]
                      .deleted_for_others_at !== null,
                };
              } else {
                new_message = null;
              }
            }
          }
        });

        const user_data_conversation_index = user_data.conversations.findIndex(
          (conversation: any) =>
            conversation._id === data.message_conversation_id
        );

        if (user_data_conversation_index !== -1) {
          if (
            user_data.conversations[user_data_conversation_index]
              .last_message &&
            user_data.conversations[user_data_conversation_index].last_message
              ._id === data.message_id
          ) {
            const updated_user_data = cloneDeep(user_data);
            updated_user_data.conversations[
              user_data_conversation_index
            ].last_message = new_message;

            queryClient.setQueryData(["user_data"], updated_user_data);
          }
        }

        return;
      }
      throw new Error();
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
          showPopupText(setPopupProps, "Message deleted");
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
