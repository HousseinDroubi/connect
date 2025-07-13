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
    sender_username: string;
    sender_profile_url: string;
    sender_pin: number;
    created_at: Date;
  };
}

type wsResponsesInterface =
  | wsToggleUserStatusResponseInterface
  | wsNewMessageResponseInterface;

export default wsResponsesInterface;
