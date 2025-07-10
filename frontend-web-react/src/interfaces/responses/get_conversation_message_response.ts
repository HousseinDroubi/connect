interface getConversationMessagesResponseInterface {
  conversation_id: string;
  messages: Array<{
    _id: string;
    sender: {
      _id: string;
      username: string;
      profile_url: string;
    };
    receiver: {
      _id: string;
      username: string;
      profile_url: string;
    };
    is_text: boolean;
    content: string;
    conversation_id: string;
    created_at: Date;
  }>;
  recipient?: {
    profile_url: string;
    _id: string;
    pin: string;
    is_online: boolean;
    username: string;
  };
}

export { getConversationMessagesResponseInterface };
