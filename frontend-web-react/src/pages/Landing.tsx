import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import ConnectUser from "../components/ConnectUser";
import Title from "../components/Title";
import useConversationMessages from "../services/hooks/mutations/converstaion_messages_mutations";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import Popup from "../components/Popup";
import { showLoading } from "../services/helpers/popup_helper";

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
  }, [data]);

  const getConversationMessagesFunction = (pin: string) => {
    mutate({ token: data!.token, pin });
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full mt-10">
          <Title title="All conversations" size="big" />
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
