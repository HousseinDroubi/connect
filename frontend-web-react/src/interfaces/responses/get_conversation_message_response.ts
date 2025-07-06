interface getConversationMessagesResponseInterface {
  messages: Array<{
    _id: string;
    sender: string;
    receiver: string;
    is_text: boolean;
    content: string;
    conversation_id: string;
    created_at: Date;
  }>;
}

export { getConversationMessagesResponseInterface };
