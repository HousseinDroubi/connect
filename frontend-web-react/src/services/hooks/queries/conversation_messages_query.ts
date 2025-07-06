import { useQuery } from "@tanstack/react-query";
import { loginResponseInterface } from "../../../interfaces/responses/login_response";

const useGetConversationMessagesQuery = (conversation_id: string | undefined) =>
  useQuery<loginResponseInterface | null>({
    queryKey: ["conversations", conversation_id],
    queryFn: () => null,
    staleTime: Infinity,
    enabled: typeof conversation_id === "string",
  });

export default useGetConversationMessagesQuery;
