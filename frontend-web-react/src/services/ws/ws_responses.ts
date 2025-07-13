import { queryClient } from "../..";
import { getConversationMessagesResponseInterface } from "../../interfaces/responses/get_conversation_message_response";
import wsResponsesInterface from "../../interfaces/services/messages/respones";

const toggleUserStatus = (params: wsResponsesInterface) => {
  if (params.event_name !== "toggle_user_status") {
    throw new Error();
  }
  const conversations = queryClient.getQueriesData({
    queryKey: ["conversations"],
    exact: false,
  });

  conversations.map(([queryKey, data]) => {
    const conversation = data as getConversationMessagesResponseInterface;
    if (conversation.recipient && conversation.recipient._id === params.from) {
      const updated_conversation = {
        ...conversation,
        recipient: {
          ...conversation.recipient,
          is_online: params.is_online,
        },
      };
      queryClient.setQueryData(queryKey, updated_conversation);
    }
  });
};

export { toggleUserStatus };
