interface messageComponentInterface {
  is_text: boolean;
  is_left: boolean;
  content: string;
  group_user?: {
    profile_url: string;
    username: string;
  };
}
