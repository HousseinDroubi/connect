import mongoose from "mongoose";

interface updateProfileResponseInterface {
  result: string;
  new_profile_url?: string;
}

interface loginResponseInterface {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  pin: number;
  profile_url: string;
  token: string;
  conversations: [
    {
      recipient: {
        profile_url: string;
        username: string;
      };
      created_at: Date;
      last_message: {
        sender: mongoose.Types.ObjectId;
        receiver: mongoose.Types.ObjectId;
        created_at: Date;
        deleted: boolean;
        is_text: boolean;
        content: string;
      };
    }
  ];
}

export { updateProfileResponseInterface, loginResponseInterface };
