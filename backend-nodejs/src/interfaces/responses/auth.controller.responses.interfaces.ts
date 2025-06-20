import mongoose from "mongoose";

interface updateProfileResponseInterface {
  result: string;
  new_profile_url?: string;
}

interface loginResponseInterface {
  result: string;
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  pin: number;
  profile_url: string;
  token: string;
  is_online: false;
  conversations: Array<{
    recipient: {
      _id: mongoose.Types.ObjectId;
      profile_url: string;
      username: string;
    } | null;
    created_at: Date;
    last_message: {
      _id: mongoose.Types.ObjectId;
      sender_id: mongoose.Types.ObjectId;
      receiver_id: mongoose.Types.ObjectId | null;
      created_at: Date;
      deleted: boolean;
      is_text: boolean;
      content: string;
    } | null;
  }>;
}

export { updateProfileResponseInterface, loginResponseInterface };
