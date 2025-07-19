import axios, { AxiosResponse } from "axios";
import { API_VIEW_IMAGE } from "../../../constants/urls/message_urls";
import { deleteMessageApiParamInterface } from "../../../interfaces/services/apis/delete_message_api_param";
import { deleteMessageResponseInterface } from "../../../interfaces/responses/delete_message_response";

const deleteMessageApi = async ({
  message_id,
  token,
}: deleteMessageApiParamInterface): Promise<
  AxiosResponse<deleteMessageResponseInterface, deleteMessageApiParamInterface>
> => {
  const response = await axios.get(`${API_VIEW_IMAGE}/${message_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export { deleteMessageApi };
