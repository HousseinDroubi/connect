import axios, { AxiosResponse } from "axios";
import { API_UPLOAD_IMAGE } from "../../../constants/urls/message_urls";
import { uploadImageApiBodyInterface } from "../../../interfaces/requests/upload_image_request";
import { uploadImageApiParamInterface } from "../../../interfaces/services/apis/upload_image_api_param";
import { uploadImageResponseInterface } from "../../../interfaces/responses/upload_image_response";

const uploadImageApi = async ({
  data,
  token,
}: uploadImageApiParamInterface): Promise<
  AxiosResponse<uploadImageResponseInterface, uploadImageApiBodyInterface>
> => {
  const response = await axios.post(`${API_UPLOAD_IMAGE}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export { uploadImageApi };
