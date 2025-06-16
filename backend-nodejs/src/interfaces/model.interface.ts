import { createUserAccountBodyInterface } from "./controller.interface";

interface userModelInterface
  extends Omit<createUserAccountBodyInterface, "file_name"> {
  profile_url: string;
  is_verified?: boolean;
  created_at?: Date;
}

export { userModelInterface };
