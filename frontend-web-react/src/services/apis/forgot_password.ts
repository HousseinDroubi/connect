import axios, { AxiosResponse } from "axios";
import {
  API_CREATE_ACCOUNT,
  API_FORGOT_PASSWORD,
} from "../../constants/urls/auth_urls";
import { createAccountResponseInterface } from "../../interfaces/responses/create_account_response";
import { createAccountBodyInterface } from "../../interfaces/requests/create_account_request";
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
