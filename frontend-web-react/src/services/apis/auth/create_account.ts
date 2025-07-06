import axios, { AxiosResponse } from "axios";
import { API_CREATE_ACCOUNT } from "../../../constants/urls/auth_urls";
import { createAccountResponseInterface } from "../../../interfaces/responses/create_account_response";
import { createAccountBodyInterface } from "../../../interfaces/requests/create_account_request";

const createAccountApi = async (
  formData: FormData
): Promise<
  AxiosResponse<
    createAccountResponseInterface,
    Omit<createAccountBodyInterface, "confirmation_password">
  >
> => {
  const response = await axios.post(API_CREATE_ACCOUNT, formData);
  return response;
};

export { createAccountApi };
