import axios, { AxiosResponse } from "axios";
import { API_UPDATE_FORGOTTEN_PASSWORD } from "../../constants/urls/auth_urls";
import { updateForgottenPasswordBodyInterface } from "../../interfaces/requests/update_forgotten_password_request";
import { updateForgottenPasswordResponseInterface } from "../../interfaces/responses/update_forgotten_password_response";

const updateForgottenPasswordApi = async (
  data: Omit<updateForgottenPasswordBodyInterface, "confirmation_password">
): Promise<
  AxiosResponse<
    updateForgottenPasswordResponseInterface,
    Omit<updateForgottenPasswordBodyInterface, "confirmation_password">
  >
> => {
  const response = await axios.put(API_UPDATE_FORGOTTEN_PASSWORD, data);
  return response;
};

export { updateForgottenPasswordApi };
