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

interface sendMessageEventInterface {
  event_name: "toggle_user_status" | "new_message";
  from: string;
  is_online?: boolean;
  message?: {
    _id: string;
    is_text: boolean;
    to: string;
    content: string;
    conversation_id: string;
  };
}

interface editMessageEventInterface extends editMessageInterface {
  from: string;
}

interface deleteMessageEventInterface extends deleteMessageInterface {
  from: string;
}

export {
  sendMessageEventInterface,
  editMessageEventInterface,
  deleteMessageEventInterface,
  newMessageInterface,
  editMessageInterface,
  deleteMessageInterface,
  newMessageEventNameType,
};
