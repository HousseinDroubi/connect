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
  last_message_receipt?: string;
}

interface connectUserSearchInterface extends connectUserBasicInterface {
  for: "search";
  pin: string;
}

type connectUserComponentInterface =
  | connectUserStatusInterface
  | connectUserConversationInterface
  | connectUserSearchInterface;

export type { connectUserComponentInterface };
