interface wsToggleUserStatusResponseInterface {
  event_name: "toggle_user_status";
  from: string;
  is_online: boolean;
}

interface wsNewMessageResponseInterface {
  event_name: "new_message";
  from: string;
  message: {
    _id: string;
    is_text: boolean;
    to: string;
    content: string;
    conversation_id: string;
    sender_id: string;
    sender_username: string;
    sender_profile_url: string;
    sender_pin: number;
    created_at: Date;
  };
}

interface wsEditMessageResponseInterface {
  event_name: "edit_message";
  from: string;
  message_id: string;
  message_conversation_id: string;
  message_new_content: string;
}

interface wsDeleteMessageResponseInterface {
  event_name: "delete_message";
  from: string;
  message_id: string;
  message_conversation_id: string;
}

type wsResponsesInterface =
  | wsToggleUserStatusResponseInterface
  | wsNewMessageResponseInterface
  | wsEditMessageResponseInterface
  | wsDeleteMessageResponseInterface;

export default wsResponsesInterface;
