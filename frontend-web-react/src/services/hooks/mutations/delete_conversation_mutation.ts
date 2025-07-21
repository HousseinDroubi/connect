import { useMutation } from "@tanstack/react-query";
import { SetPopupType } from "../../../interfaces/general_types";
import { NavigateFunction } from "react-router-dom";
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
    },
    onError(error) {
      // Handle error case
    },
  });

export default useDeleteConversation;
