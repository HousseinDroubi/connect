interface newMessageInterface {
  event_name: "new_message";
  is_text: boolean;
  content: string;
  to: string;
}

interface editMessageInterface {
  event_name: "edit_message";
  message_id: string;
  message_new_content: string;
}

interface deleteMessageInterface {
  event_name: "delete_message";
  message_id: string;
}

type newMessageEventNameType =
  | newMessageInterface["event_name"]
  | editMessageInterface["event_name"]
  | deleteMessageInterface["event_name"];

interface toggleUserStatusEventInterface {
  event_name: "toggle_user_status";
  from: string;
  is_online: boolean;
}

interface sentMessageEventInterface {
  event_name: "new_message";
  from: string;
  message: {
    _id: string;
    is_text: boolean;
    to: string;
    content: string;
    conversation_id: string;
    sender_username: string;
    sender_profile_url: string;
    sender_pin: number;
    created_at: Date;
  };
}

interface editMessageEventInterface extends editMessageInterface {
  from: string;
  message_conversation_id: string;
}

interface deleteMessageEventInterface extends deleteMessageInterface {
  from: string;
}

export {
  sentMessageEventInterface,
  editMessageEventInterface,
  deleteMessageEventInterface,
  newMessageInterface,
  editMessageInterface,
  deleteMessageInterface,
  newMessageEventNameType,
  toggleUserStatusEventInterface,
};
