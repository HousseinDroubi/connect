import { useEffect } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate, useParams } from "react-router-dom";
import useGetConversationMessagesQuery from "../services/hooks/queries/conversation_messages_query";

const Conversation = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const { conversation_id } = useParams();
  const { data: getConversationMessagesData, isSuccess } =
    useGetConversationMessagesQuery(conversation_id);

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  useEffect(() => {
    if (!getConversationMessagesData && !isSuccess) navigate("/landing");
  }, [getConversationMessagesData, isSuccess]);

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full mt-10"></section>
      </div>
    </div>
  );
};

export default Conversation;
