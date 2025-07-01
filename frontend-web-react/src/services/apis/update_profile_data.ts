import axios from "axios";
import { API_UPDATE_PROFILE_DATA } from "../../constants/urls/auth_urls";
import { updateProfileDataResponseInterface } from "../../interfaces/responses/update_profile_data_response";
import { updateProfileDataApiParamInterface } from "../../interfaces/services/apis/update_profile_data_api_param";

const updateProfileDataApi = async ({
  formData,
  token,
}: updateProfileDataApiParamInterface): Promise<updateProfileDataResponseInterface> => {
  const response = await axios.put(API_UPDATE_PROFILE_DATA, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { updateProfileDataApi };
