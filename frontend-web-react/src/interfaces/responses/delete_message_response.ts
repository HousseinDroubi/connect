interface deleteMessageResponseInterface {
  result: "message_deleted";
  message_id: string;
  message_conversation_id: string;
}

export type { deleteMessageResponseInterface };
