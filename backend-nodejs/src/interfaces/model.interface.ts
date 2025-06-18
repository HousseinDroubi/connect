import mongoose from "mongoose";
import { createUserAccountBodyInterface } from "./controllers/auth.controller.interfaces";

interface userModelInterface
  extends Omit<createUserAccountBodyInterface, "file_name"> {
  profile_url: string;
  is_verified?: boolean;
  created_at?: Date;
}

interface tokenModelInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  value: string;
  created_at: Date;
}

export { userModelInterface, tokenModelInterface };
