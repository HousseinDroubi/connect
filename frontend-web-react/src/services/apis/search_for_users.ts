import axios, { AxiosResponse } from "axios";
import { API_SEARCH_FOR_USERS } from "../../constants/urls/user_urls";
import { searchForUsersResponseInterface } from "../../interfaces/responses/search_for_users";
import { searchForUsersApiParamInterface } from "../../interfaces/services/apis/search_for_users_api_param";

const searchForUsersApi = async ({
  content,
  token,
}: searchForUsersApiParamInterface): Promise<
  AxiosResponse<
    searchForUsersResponseInterface,
    searchForUsersApiParamInterface
  >
> => {
  const response = await axios.get(`${API_SEARCH_FOR_USERS}/${content}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export { searchForUsersApi };
