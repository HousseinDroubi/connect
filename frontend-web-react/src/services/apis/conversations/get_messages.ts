import axios from "axios";
import { API_GET_CONVERSATION_MESSAGES } from "../../../constants/urls/conversation_urls";
import { getConversationMessagesParamInterface } from "../../../interfaces/services/apis/get_conversation_messages_api_param";
import { getConversationMessagesResponseInterface } from "../../../interfaces/responses/get_conversation_message_response";

const getConversationMessagesApi = async ({
  pin,
  token,
}: getConversationMessagesParamInterface): Promise<getConversationMessagesResponseInterface> => {
  const response = await axios.get(`${API_GET_CONVERSATION_MESSAGES}/${pin}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { getConversationMessagesApi };
