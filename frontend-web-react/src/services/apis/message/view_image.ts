import axios, { AxiosResponse } from "axios";
import { viewImageApiParamInterface } from "../../../interfaces/services/apis/view_image_api_param";
import { API_VIEW_IMAGE } from "../../../constants/urls/message_urls";

const viewImageApi = async ({
  message_id,
  token,
}: viewImageApiParamInterface): Promise<
  AxiosResponse<string, viewImageApiParamInterface>
> => {
  const response = await axios.get(`${API_VIEW_IMAGE}/${message_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export { viewImageApi };
