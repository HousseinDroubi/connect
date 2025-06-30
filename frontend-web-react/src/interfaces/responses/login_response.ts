interface loginResponseInterface {
  result: "logged_in";
  _id: string;
  email: string;
  username: string;
  pin: number;
  profile_url: string;
  token: string;
  is_online: false;
  conversations: Array<{
    _id: string;
    recipient: {
      _id: string;
      profile_url: string;
      username: string;
      pin: number;
    } | null;
    created_at: Date;
    last_message: {
      _id: string;
      sender: string;
      receiver: string | null;
      created_at: Date;
      deleted: boolean;
      is_text: boolean;
      content: string;
    } | null;
  }>;
}

export type { loginResponseInterface };
