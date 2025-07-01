import axios, { AxiosResponse } from "axios";
import { API_UPDATE_PROFILE_DATA } from "../../constants/urls/auth_urls";
import { updateProfileDataResponseInterface } from "../../interfaces/responses/update_profile_data_response";

const updateProfileDataApi = async (
  formData: FormData
): Promise<updateProfileDataResponseInterface> => {
  const response = await axios.put(API_UPDATE_PROFILE_DATA, formData);
  return response.data;
};

export { updateProfileDataApi };
