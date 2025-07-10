import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate, useParams } from "react-router-dom";
import useGetConversationMessagesQuery from "../services/hooks/queries/conversation_messages_query";
import ConnectUser from "../components/ConnectUser";
import TextField from "../components/TextField";
import Message from "../components/Message";

const Conversation = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const { id } = useParams();
  const { data: getConversationMessagesData, isSuccess } =
    useGetConversationMessagesQuery(id);
  const [messageText, setMessageText] = useState<string>("");
  const [messageImage, setMessageImage] = useState<File | null>(null);

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  useEffect(() => {
    if (!getConversationMessagesData && !isSuccess) navigate("/landing");
    console.log(getConversationMessagesData);
  }, [getConversationMessagesData, isSuccess]);

  const sendMessage = () => {
    console.log("Sending message...");
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full">
          <ConnectUser
            for="status"
            is_group={getConversationMessagesData?.is_group}
            profile_url={
              getConversationMessagesData?.is_group
                ? undefined
                : getConversationMessagesData?.recipient?.profile_url
            }
            username={
              getConversationMessagesData?.is_group
                ? undefined
                : getConversationMessagesData?.recipient?.username
            }
            status={
              getConversationMessagesData?.is_group
                ? undefined
                : getConversationMessagesData?.recipient?.is_online
            }
          />
          {getConversationMessagesData?.messages.length !== 0 && (
            <article className="flex flex-col mt-36">
              {getConversationMessagesData?.messages.map((message) => (
                <Message
                  is_left={message.sender._id !== data!._id}
                  is_text={message.is_text}
                  message_id={message._id}
                  token={data!.token}
                  content={message.content}
                  group_user={
                    message.sender._id !== data!._id &&
                    !getConversationMessagesData.is_group
                      ? {
                          username: message.sender.username,
                          profile_url: message.sender.profile_url,
                        }
                      : undefined
                  }
                />
              ))}
            </article>
          )}
          <TextField
            hint="Type your message..."
            value={messageText}
            setText={setMessageText}
            doNextFunction={sendMessage}
            is_for_message
            is_full
            setImage={setMessageImage}
          />
        </section>
      </div>
    </div>
  );
};

export default Conversation;
