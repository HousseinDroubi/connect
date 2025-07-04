interface otherUserBasicInterface {
  username: string;
  profile_url: string;
  is_group: boolean;
}

interface otherUserStatusInterface extends otherUserBasicInterface {
  status: boolean | null;
}

interface otherUserConversationInterface extends otherUserBasicInterface {
  last_message_text: string | null;
}

interface otherUserSearchInterface extends otherUserBasicInterface {
  pin: string;
}

type otherUserComponentInterface =
  | otherUserStatusInterface
  | otherUserConversationInterface
  | otherUserSearchInterface;

export type { otherUserComponentInterface };
