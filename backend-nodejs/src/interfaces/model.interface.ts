import { createUserAccountBodyInterface } from "./controller.interface";

interface userModelInterface extends createUserAccountBodyInterface {
  is_verified?: boolean;
  created_at?: Date;
}

export { userModelInterface };
