interface wsSendMessageRequestInterface {
  event_name: "new_message";
  is_text: boolean;
  content: string;
  to: string | null;
}

interface wsEditMessageRequestInterface {
  event_name: "edit_message";
  message_id: string;
  message_new_content: string;
}

interface wsDeleteMessageRequestInterface {
  event_name: "delete_message";
  message_id: string;
}

export {
  wsSendMessageRequestInterface,
  wsEditMessageRequestInterface,
  wsDeleteMessageRequestInterface,
};
