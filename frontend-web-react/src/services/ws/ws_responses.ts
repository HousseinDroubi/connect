import { queryClient } from "../..";
import { getConversationMessagesResponseInterface } from "../../interfaces/responses/get_conversation_message_response";
import wsResponsesInterface from "../../interfaces/services/messages/respones";
import { cloneDeep } from "lodash";

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

const receiveNewMessage = (params: wsResponsesInterface) => {
  if (params.event_name !== "new_message") {
    throw new Error("Invalid event");
  }

  const user_data: any = queryClient.getQueryData(["user_data"]);

  if (!user_data || !user_data.conversations) {
    return;
  }

  const new_message = {
    _id: params.message._id,
    sender: params.from,
    receiver: params.message.to,
    is_text: params.message.is_text,
    content: params.message.content,
    conversation_id: params.message.conversation_id,
    created_at: params.message.created_at,
    deleted: false,
  };

  const conversation_index = user_data.conversations.findIndex(
    (conversation: any) => conversation._id === params.message.conversation_id
  );

  let updatedConversations;

  if (conversation_index !== -1) {
    const updatedConversation = {
      ...user_data.conversations[conversation_index],
      last_message: new_message,
    };

    updatedConversations = [
      updatedConversation,
      ...user_data.conversations.slice(0, conversation_index),
      ...user_data.conversations.slice(conversation_index + 1),
    ];
  } else {
    const newConversation = {
      _id: params.message.conversation_id,
      last_message: new_message,
      recipient: {
        _id: params.message.sender_id,
        profile_url: params.message.sender_profile_url,
        username: params.message.sender_username,
        pin: params.message.sender_pin,
      },
    };

    updatedConversations = [newConversation, ...user_data.conversations];
  }

  queryClient.setQueryData(["user_data"], {
    ...user_data,
    conversations: updatedConversations,
  });

  const conversations = queryClient.getQueriesData({
    queryKey: ["conversations"],
    exact: false,
  });
  conversations.map(([queryKey, data]) => {
    const conversation = data as getConversationMessagesResponseInterface;
    if (
      (conversation.recipient && conversation.recipient._id === params.from) ||
      (conversation.is_group && params.message.to === null) ||
      user_data._id === params.from
    ) {
      const updated_messages = conversation.messages;
      updated_messages.push({
        _id: params.message._id,
        sender: {
          _id: params.from,
          username: params.message.sender_username,
          profile_url: params.message.sender_profile_url,
        },
        receiver: params.message.to
          ? {
              _id: user_data._id as string,
              username: user_data.username as string,
              profile_url: user_data.profile_url as string,
            }
          : undefined,
        is_text: params.message.is_text,
        content: params.message.content,
        conversation_id: params.message.conversation_id,
        created_at: params.message.created_at,
        deleted_for_others_at: null,
      });

      const updated_conversation = {
        ...conversation,
      };
      queryClient.setQueryData(queryKey, updated_conversation);
    }
  });
};

const editMessage = (params: wsResponsesInterface) => {
  if (params.event_name !== "edit_message") {
    throw new Error("Invalid event");
  }
  const user_data: any = queryClient.getQueryData(["user_data"]);

  if (!user_data || !user_data.conversations) {
    return;
  }

  const user_data_conversation_index = user_data.conversations.findIndex(
    (conversation: any) => conversation._id === params.message_conversation_id
  );

  if (user_data_conversation_index !== -1) {
    if (
      user_data.conversations[user_data_conversation_index].last_message &&
      user_data.conversations[user_data_conversation_index].last_message._id ===
        params.message_id
    ) {
      const updated_user_data = cloneDeep(user_data);
      updated_user_data.conversations[
        user_data_conversation_index
      ].last_message.content = params.message_new_content;

      queryClient.setQueryData(["user_data"], updated_user_data);
    }
  }

  const conversations = queryClient.getQueriesData({
    queryKey: ["conversations"],
    exact: false,
  });

  conversations.map(([queryKey, data]) => {
    const conversation = data as getConversationMessagesResponseInterface;
    if (conversation.recipient && conversation.recipient._id === params.from) {
      const index = conversation.messages.findIndex(
        (message) => message._id === params.message_id
      );
      conversation.messages[index].content = params.message_new_content;

      const updated_conversation = {
        ...conversation,
      };
      queryClient.setQueryData(queryKey, updated_conversation);
    }
  });
};

const deleteMessage = (params: wsResponsesInterface) => {
  if (params.event_name !== "delete_message") {
    throw new Error("Invalid event");
  }

  const user_data: any = queryClient.getQueryData(["user_data"]);

  if (!user_data || !user_data.conversations) {
    return;
  }

  const user_data_conversation_index = user_data.conversations.findIndex(
    (conversation: any) => conversation._id === params.message_conversation_id
  );

  if (user_data_conversation_index !== -1) {
    if (
      user_data.conversations[user_data_conversation_index].last_message &&
      user_data.conversations[user_data_conversation_index].last_message._id ===
        params.message_id
    ) {
      const updated_user_data = cloneDeep(user_data);
      updated_user_data.conversations[
        user_data_conversation_index
      ].last_message.content = "This message has been deleted";
      updated_user_data.conversations[
        user_data_conversation_index
      ].last_message.deleted = true;
      queryClient.setQueryData(["user_data"], updated_user_data);
    }
  }

  const conversations = queryClient.getQueriesData({
    queryKey: ["conversations"],
    exact: false,
  });

  conversations.map(([queryKey, data]) => {
    const conversation = data as getConversationMessagesResponseInterface;
    if (conversation.conversation_id === params.message_conversation_id) {
      const index = conversation.messages.findIndex(
        (message) => message._id === params.message_id
      );
      conversation.messages[index].content = "This message has been deleted";
      conversation.messages[index].deleted_for_others_at = new Date();

      const updated_conversation = {
        ...conversation,
      };
      queryClient.setQueryData(queryKey, updated_conversation);
    }
  });
};

export { toggleUserStatus, receiveNewMessage, editMessage, deleteMessage };
