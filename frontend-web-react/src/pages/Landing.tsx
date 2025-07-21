import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import ConnectUser from "../components/ConnectUser";
import Title from "../components/Title";
import useConversationMessages from "../services/hooks/mutations/conversation_messages_mutations";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import Popup from "../components/Popup";
import { showLoading } from "../services/helpers/popup_helper";
import Singleton from "../services/messages/Singleton";

const Landing = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const {
    data: dataConversationMessages,
    mutate,
    isPending,
    isError,
  } = useConversationMessages(setPopupProps, navigate);

  const deleteConversationApi = (conversation_id: string) => {
    console.warn(`Deleting ${conversation_id} conversation`);
  };

  useEffect(() => {
    if (isPending) showLoading(setPopupProps, true);
  }, [isPending]);

  useEffect(() => {
    if (dataConversationMessages && !isError) {
      showLoading(setPopupProps, false);
      navigate(`/conversation/${dataConversationMessages.conversation_id}`);
    }
  }, [dataConversationMessages, isError]);

  useEffect(() => {
    if (data === null) navigate("/");
    if (data && data.token) Singleton.getInstance(data.token);
  }, [data]);

  const getConversationMessagesFunction = (pin: string) => {
    mutate({ token: data!.token, pin });
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-full md:w-3/4 h-full mt-10">
          <div className="ml-3 md:ml-0">
            <Title title="All conversations" size="big" />
          </div>
          <div className="mt-6">
            {data &&
              data.conversations.map((conversation) => (
                <ConnectUser
                  getConversationMessagesFunction={() =>
                    getConversationMessagesFunction(
                      conversation.recipient === null
                        ? "broadcast"
                        : String(conversation.recipient!.pin)
                    )
                  }
                  conversation_id={conversation._id}
                  deleteConversationFunction={() =>
                    deleteConversationApi(
                      conversation.recipient
                        ? String(conversation.recipient.pin)
                        : "broadcast"
                    )
                  }
                  key={conversation._id}
                  for="conversation"
                  username={
                    conversation.recipient !== null
                      ? conversation.recipient.username
                      : undefined
                  }
                  profile_url={
                    conversation.recipient !== null
                      ? conversation.recipient.profile_url
                      : undefined
                  }
                  is_group={conversation.recipient === null}
                  last_message_text={
                    !conversation.last_message
                      ? null
                      : conversation.last_message.is_text
                      ? conversation.last_message.content
                      : "Photo"
                  }
                  is_last_message_deleted={
                    !conversation.last_message
                      ? false
                      : conversation.last_message.deleted
                  }
                />
              ))}
          </div>
        </section>
      </div>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default Landing;
