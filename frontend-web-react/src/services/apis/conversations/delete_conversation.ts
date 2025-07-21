import axios from "axios";
import { API_DELETE_CONVERSATION } from "../../../constants/urls/conversation_urls";
import { deleteConversationApiParamInterface } from "../../../interfaces/services/apis/delete_conversation_api_param";
import { deleteConversationResponseInterface } from "../../../interfaces/responses/delete_conversation_response";

const deleteConversationApi = async ({
  conversation_id,
  token,
}: deleteConversationApiParamInterface): Promise<deleteConversationResponseInterface> => {
  const response = await axios.delete(
    `${API_DELETE_CONVERSATION}/${conversation_id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export { deleteConversationApi };
