import axios, { AxiosResponse } from "axios";
import { API_VERIFY_TOKEN } from "../../../constants/urls/auth_urls";
import { verifyAccountParamInterface } from "../../../interfaces/requests/verify_token_request";
import { verifyAccountResponseInterface } from "../../../interfaces/responses/verify_token_response";

const verifyAccountApi = async (
  token: string
): Promise<
  AxiosResponse<verifyAccountResponseInterface, verifyAccountParamInterface>
> => {
  const response = await axios.get(`${API_VERIFY_TOKEN}/${token}`);
  return response;
};

export { verifyAccountApi };
