import { useEffect } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate, useParams } from "react-router-dom";
import useGetConversationMessagesQuery from "../services/hooks/queries/conversation_messages_query";
import ConnectUser from "../components/ConnectUser";

const Conversation = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const { id } = useParams();
  const { data: getConversationMessagesData, isSuccess } =
    useGetConversationMessagesQuery(id);

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  useEffect(() => {
    if (!getConversationMessagesData && !isSuccess) navigate("/landing");
    console.log(getConversationMessagesData);
  }, [getConversationMessagesData, isSuccess]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full">
          <ConnectUser
            for="status"
            is_group={getConversationMessagesData?.recipient === undefined}
            profile_url={
              !getConversationMessagesData?.recipient
                ? undefined
                : getConversationMessagesData?.recipient?.profile_url
            }
            username={
              !getConversationMessagesData?.recipient
                ? undefined
                : getConversationMessagesData.recipient.username
            }
            status={
              !getConversationMessagesData?.recipient
                ? undefined
                : getConversationMessagesData?.recipient?.is_online
            }
          />
        </section>
      </div>
    </div>
  );
};

export default Conversation;
