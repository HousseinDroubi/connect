import { queryClient } from "../..";
import { getConversationMessagesResponseInterface } from "../../interfaces/responses/get_conversation_message_response";
import wsResponsesInterface from "../../interfaces/services/messages/respones";

const toggleUserStatus = ({ from, is_online }: wsResponsesInterface) => {
  const conversations = queryClient.getQueriesData({
    queryKey: ["conversations"],
    exact: false,
  });

  conversations.map(([queryKey, data]) => {
    const conversation = data as getConversationMessagesResponseInterface;
    if (conversation.recipient && conversation.recipient._id === from) {
      const updated_conversation = {
        ...conversation,
        recipient: {
          ...conversation.recipient,
          is_online,
        },
      };
      queryClient.setQueryData(queryKey, updated_conversation);
    }
  });
};

export { toggleUserStatus };
