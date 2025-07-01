import { updatePasswordBodyInterface } from "../../requests/update_password_request";

interface updatePasswordApiParamInterface {
  body: Omit<updatePasswordBodyInterface, "confirmation_new_password">;
  token: string;
}

export { updatePasswordApiParamInterface };
