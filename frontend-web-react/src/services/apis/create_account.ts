import axios, { AxiosResponse } from "axios";
import { API_CREATE_ACCOUNT } from "../../constants/urls/auth_urls";

const createAccountApi = async (formData: FormData): Promise<AxiosResponse> => {
  const response = await axios.post(API_CREATE_ACCOUNT, formData);
  return response;
};

export { createAccountApi };
