interface connectUserBasicInterface {
  username?: string;
  profile_url?: string;
  is_group?: boolean;
}

interface connectUserStatusInterface extends connectUserBasicInterface {
  for: "status";
  status: boolean;
}

interface connectUserConversationInterface extends connectUserBasicInterface {
  for: "conversation";
  last_message_text: string | null;
  getConversationMessagesFunction: () => void;
}

interface connectUserSearchInterface extends connectUserBasicInterface {
  for: "search";
  pin: string;
  getConversationMessagesFunction: () => void;
}

type connectUserComponentInterface =
  | connectUserStatusInterface
  | connectUserConversationInterface
  | connectUserSearchInterface;

export type { connectUserComponentInterface };
