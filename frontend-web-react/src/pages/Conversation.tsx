import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate, useParams } from "react-router-dom";
import useGetConversationMessagesQuery from "../services/hooks/queries/conversation_messages_query";
import ConnectUser from "../components/ConnectUser";
import TextField from "../components/TextField";
import Message from "../components/Message";
import {
  wsDeleteMessageRequestInterface,
  wsSendMessageRequestInterface,
} from "../interfaces/services/messages/requests";
import Singleton from "../services/messages/Singleton";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import {
  deleteMessageForAll,
  deleteMessageForMe,
  editMessage,
  showPopupText,
} from "../services/helpers/popup_helper";
import useDeleteMessage from "../services/hooks/mutations/delete_message_mutation";
import { uploadImageApi } from "../services/apis/message/upload_image";
import axios from "axios";

const Conversation = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const { id } = useParams();
  const { data: getConversationMessagesData, isSuccess } =
    useGetConversationMessagesQuery(id);
  const [messageText, setMessageText] = useState<string>("");
  const [messageImage, setMessageImage] = useState<File | null>(null);
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );
  const [editedMessageContent, setEditedMessageContent] = useState<string>("");
  const [editedMessageId, setEditedMessageId] = useState<string>("");
  const { mutate } = useDeleteMessage(setPopupProps, navigate);

  const uploadImage = async () => {
    if (messageImage !== null) {
      const formData = new FormData();
      formData.append("image", messageImage);
      try {
        const response = await uploadImageApi({
          data: formData,
          token: data!.token,
        });
        const response_data = response.data;

        if (response_data.result === "image_uploaded") {
          Singleton.sendMessageWsRequest({
            event_name: "new_message",
            is_text: false,
            content: response_data.file_name,
            to: getConversationMessagesData!.is_group
              ? null
              : getConversationMessagesData!.recipient!._id,
          });
          return;
        }
        throw new Error();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") {
            showPopupText(setPopupProps, "Server isn't available");
            return;
          }

          if (error.status === 401) {
            showPopupText(
              setPopupProps,
              "Session ended. Please login again.",
              () => {
                navigate("/");
              }
            );
            return;
          } else if (error.status === 404) {
            if (error.response?.data.result === "user_not_found") {
              showPopupText(setPopupProps, "User not found");
            } else if (error.response?.data.result === "message_not_found") {
              showPopupText(setPopupProps, "Message not found");
            }
            return;
          } else if (error.status === 405) {
            if (error.response?.data.result === "user_not_verified") {
              showPopupText(
                setPopupProps,
                "You are not verified yet. Please open your inbox and activate your account"
              );
            } else if (error.response?.data.result === "user_account_deleted") {
              showPopupText(setPopupProps, "Use account deleted");
            }
            return;
          }
        }
        showPopupText(setPopupProps, "Something went wrong");
      }
    }
    setMessageImage(null);
  };

  useEffect(() => {
    if (messageImage !== null && data && getConversationMessagesData) {
      uploadImage();
    }
  }, [messageImage]);

  useEffect(() => {
    if (editedMessageContent !== "" && editedMessageId !== "") {
      editConversationMessage();
    }
  }, [editedMessageContent, editedMessageId]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const editConversationMessage = () => {
    editMessage(
      setPopupProps,
      setEditedMessageContent,
      editedMessageContent,
      () => {
        if (editedMessageContent === "") {
          setPopupProps(null);
          return;
        }

        Singleton.editMessageWsRequest({
          event_name: "edit_message",
          message_id: editedMessageId,
          message_new_content: editedMessageContent,
        });

        setEditedMessageContent("");
        setEditedMessageId("");
        setPopupProps(null);
      }
    );
  };

  const deleteConversationMessageForMe = (message_id: string) => {
    if (!data) return;
    mutate({
      token: data.token,
      message_id,
    });
    setPopupProps(null);
  };

  const deleteConversationMessageForEveryone = (message_id: string) => {
    const data: wsDeleteMessageRequestInterface = {
      event_name: "delete_message",
      message_id,
    };
    Singleton.deleteMessageWsRequest(data);
    setPopupProps(null);
  };

  const deleteConversationMessage = (
    is_for_all: boolean,
    message_id: string,
    is_message_deleted_for_all: boolean
  ) => {
    if (is_for_all && !is_message_deleted_for_all) {
      deleteMessageForAll(
        setPopupProps,
        () => {
          deleteConversationMessageForMe(message_id);
        },
        () => {
          deleteConversationMessageForEveryone(message_id);
        }
      );
    } else {
      deleteMessageForMe(setPopupProps, () => {
        deleteConversationMessageForMe(message_id);
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [getConversationMessagesData?.messages.length]);

  useEffect(() => {
    if (data === null) navigate("/");
  }, [data]);

  useEffect(() => {
    if (!getConversationMessagesData && !isSuccess) navigate("/landing");
  }, [getConversationMessagesData, isSuccess]);

  const sendMessage = (is_text: boolean, content: string) => {
    const message_data: wsSendMessageRequestInterface = {
      event_name: "new_message",
      is_text,
      content,
      to: getConversationMessagesData!.recipient
        ? getConversationMessagesData!.recipient._id
        : null,
    };
    Singleton.sendMessageWsRequest(message_data);
    setMessageText("");
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full">
          {getConversationMessagesData?.messages.length !== 0 && (
            <article className="flex flex-col mt-36">
              {getConversationMessagesData?.messages.map((message, index) => (
                <Message
                  key={message._id}
                  onEdit={() => {
                    setEditedMessageContent(message.content);
                    setEditedMessageId(message._id);
                  }}
                  onDelete={() => {
                    deleteConversationMessage(
                      message.sender._id === data!._id,
                      message._id,
                      message.deleted_for_others_at !== null
                    );
                  }}
                  is_first_message={index === 0}
                  is_last_image={
                    getConversationMessagesData.messages.length - 1 === index &&
                    getConversationMessagesData.messages.length !== 0
                  }
                  is_left={message.sender._id !== data!._id}
                  is_text={message.is_text}
                  message_id={message._id}
                  token={data!.token}
                  content={message.content}
                  group_user={
                    message.sender._id !== data!._id &&
                    getConversationMessagesData.is_group
                      ? {
                          username: message.sender.username,
                          profile_url: message.sender.profile_url,
                        }
                      : undefined
                  }
                  is_deleted_for_all={message.deleted_for_others_at !== null}
                />
              ))}
            </article>
          )}
          <TextField
            hint="Type your message..."
            value={messageText}
            setText={setMessageText}
            doNextFunction={() => {
              sendMessage(true, messageText);
            }}
            is_for_message
            is_full
            setImage={setMessageImage}
          />
        </section>
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
      </div>
      {popupProps?.for === "edit_message_for_user" ? (
        <Popup
          {...popupProps}
          text={editedMessageContent}
          setText={setEditedMessageContent}
        />
      ) : popupProps ? (
        <Popup {...popupProps} />
      ) : null}
    </div>
  );
};

export default Conversation;
