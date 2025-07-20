import axios from "axios";
import { API_DELETE_MESSAGE } from "../../../constants/urls/message_urls";
import { deleteMessageApiParamInterface } from "../../../interfaces/services/apis/delete_message_api_param";
import { deleteMessageResponseInterface } from "../../../interfaces/responses/delete_message_response";

const deleteMessageApi = async ({
  message_id,
  token,
}: deleteMessageApiParamInterface): Promise<deleteMessageResponseInterface> => {
  const response = await axios.delete(`${API_DELETE_MESSAGE}/${message_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export { deleteMessageApi };
