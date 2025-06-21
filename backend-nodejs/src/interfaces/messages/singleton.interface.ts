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
  };
}

interface newMessageInterface {
  is_text: boolean;
  content: string;
  to: string;
}

export { eventInterface, newMessageInterface };
