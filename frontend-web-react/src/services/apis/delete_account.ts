import axios, { AxiosResponse } from "axios";
import { API_DELETE_USER_ACCOUNT } from "../../constants/urls/auth_urls";
import { deleteAccountResponseInterface } from "../../interfaces/responses/delete_account_response";

const deleteAccountApi = async (
  token: string
): Promise<deleteAccountResponseInterface> => {
  const response = await axios.delete(API_DELETE_USER_ACCOUNT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { deleteAccountApi };
