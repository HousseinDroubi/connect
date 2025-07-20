import axios from "axios";
import { API_UPDATE_PASSWORD } from "../../../constants/urls/auth_urls";
import { updatePasswordApiParamInterface } from "../../../interfaces/services/apis/update_password_api_param";
import { updatePasswordResponseInterface } from "../../../interfaces/responses/update_password_response";

const updatePasswordApi = async ({
  body,
  token,
}: updatePasswordApiParamInterface): Promise<updatePasswordResponseInterface> => {
  const response = await axios.put(API_UPDATE_PASSWORD, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { updatePasswordApi };
