import mongoose from "mongoose";
import { createUserAccountBodyInterface } from "../controllers/auth.controller.interfaces";

interface userModelInterface
  extends Omit<createUserAccountBodyInterface, "file_name"> {
  profile_url: string;
  is_verified?: boolean;
  created_at?: Date;
  deleted_at?: null | Date;
}

interface tokenModelInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  value: string;
  created_at: Date;
}

interface messageModelInterface {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId | null;
  created_at: Date;
  deleted_for_sender_at: Date | null;
  deleted_for_others_at: Date | null;
  is_text: boolean;
  content: string;
}

interface conversationModelInterface {
  between: [mongoose.Types.ObjectId] | null;
  created_at: Date;
  last_message: mongoose.Types.ObjectId;
  deleted_for: [mongoose.Types.ObjectId];
}

export {
  userModelInterface,
  tokenModelInterface,
  messageModelInterface,
  conversationModelInterface,
};
