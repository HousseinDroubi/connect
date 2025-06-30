import axios, { AxiosResponse } from "axios";
import { API_FORGOT_PASSWORD } from "../../constants/urls/auth_urls";
import { forotPasswordResponseInterface } from "../../interfaces/responses/forgot_password_response";
import { forotPasswordBodyInterface } from "../../interfaces/requests/forgot_password_request";

const forgotPasswordApi = async (
  data: forotPasswordBodyInterface
): Promise<
  AxiosResponse<forotPasswordResponseInterface, forotPasswordBodyInterface>
> => {
  const response = await axios.post(API_FORGOT_PASSWORD, data);
  return response;
};

export { forgotPasswordApi };
