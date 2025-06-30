import axios, { AxiosResponse } from "axios";
import { API_VERIFY_TOKEN } from "../../constants/urls/auth_urls";
import { verifyAccountParamInterface } from "../../interfaces/requests/verify_token_request";
import { verifyAccountResponseInterface } from "../../interfaces/responses/verify_token_response";

const verifyAccountApi = async (
  token: string
): Promise<
  AxiosResponse<verifyAccountParamInterface, verifyAccountResponseInterface>
> => {
  const response = await axios.post(`${API_VERIFY_TOKEN}/${token}`);
  return response;
};

export { verifyAccountApi };
