import axios from "axios";
import { API_UPDATE_PROFILE_DATA } from "../../constants/urls/auth_urls";
import { updateProfileDataResponseInterface } from "../../interfaces/responses/update_profile_data_response";

const updateProfileDataApi = async (
  formData: FormData,
  token: string
): Promise<updateProfileDataResponseInterface> => {
  const response = await axios.put(API_UPDATE_PROFILE_DATA, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { updateProfileDataApi };
