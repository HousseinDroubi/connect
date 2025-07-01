import axios, { AxiosResponse } from "axios";
import { API_LOGIN } from "../../constants/urls/auth_urls";
import { loginResponseInterface } from "../../interfaces/responses/login_response";
import { loginBodyInterface } from "../../interfaces/requests/login_request";

const loginApi = async (
  data: loginBodyInterface
): Promise<loginResponseInterface> => {
  const response = await axios.post(API_LOGIN, data);
  return response.data;
};

export { loginApi };
