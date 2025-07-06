import { useQuery } from "@tanstack/react-query";
import { getConversationMessagesResponseInterface } from "../../../interfaces/responses/get_conversation_message_response";

const useGetConversationMessagesQuery = (conversation_id: string | undefined) =>
  useQuery<getConversationMessagesResponseInterface | null>({
    queryKey: ["conversations", conversation_id],
    queryFn: () => null,
    staleTime: Infinity,
    enabled: typeof conversation_id === "string",
  });

export default useGetConversationMessagesQuery;
