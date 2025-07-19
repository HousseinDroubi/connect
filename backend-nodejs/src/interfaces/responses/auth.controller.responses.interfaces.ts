import mongoose from "mongoose";

interface updateProfileResponseInterface {
  result: string;
  new_profile_url?: string;
  new_username?: string;
}

interface loginResponseInterface {
  result: "logged_in";
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  pin: number;
  profile_url: string;
  token: string;
  is_online: boolean;
  conversations: Array<{
    _id: mongoose.Types.ObjectId;
    recipient: {
      _id: mongoose.Types.ObjectId;
      profile_url: string;
      username: string;
      pin: number;
    } | null;
    created_at: Date;
    last_message: {
      _id: mongoose.Types.ObjectId;
      sender: mongoose.Types.ObjectId;
      receiver: mongoose.Types.ObjectId | null;
      created_at: Date;
      deleted: boolean;
      is_text: boolean;
      content: string;
    } | null;
  }>;
}

export { updateProfileResponseInterface, loginResponseInterface };
