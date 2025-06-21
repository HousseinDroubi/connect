interface eventInterface {
  event_name:
    | "toggle_user_status"
    | "new_message"
    | "edit_message"
    | "delete_message_for_others";
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

export {
  eventInterface,
  newMessageInterface,
  editMessageInterface,
  deleteMessageInterface,
};
