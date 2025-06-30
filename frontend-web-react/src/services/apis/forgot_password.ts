import axios, { AxiosResponse } from "axios";
import { API_FORGOT_PASSWORD } from "../../constants/urls/auth_urls";
import { forgotPasswordResponseInterface } from "../../interfaces/responses/forgot_password_response";
import { forgotPasswordBodyInterface } from "../../interfaces/requests/forgot_password_request";

const forgotPasswordApi = async (
  data: forgotPasswordBodyInterface
): Promise<
  AxiosResponse<forgotPasswordResponseInterface, forgotPasswordBodyInterface>
> => {
  const response = await axios.post(API_FORGOT_PASSWORD, data);
  return response;
};

export { forgotPasswordApi };
