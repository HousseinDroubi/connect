import axios, { AxiosResponse } from "axios";
import { API_SEARCH_FOR_USERS } from "../../constants/urls/user_urls";
import { searchForUsersResponseInterface } from "../../interfaces/responses/search_for_users";

const searchForUsersApi = async (
  content: string
): Promise<AxiosResponse<searchForUsersResponseInterface, string>> => {
  const response = await axios.get(`${API_SEARCH_FOR_USERS}/${content}`);
  return response;
};

export { searchForUsersApi };
