import { API_BASE_URL } from "../basic_urls";

const API_AUTH = `${API_BASE_URL}/auth`;

const API_CREATE_ACCOUNT = `${API_AUTH}/create_new_account`;
const API_LOGIN = `${API_AUTH}/login`;
const API_FORGOT_PASSWORD = `${API_AUTH}/forgot_password`;
const API_VERIFY_TOKEN = `${API_AUTH}/verify_account`;
const API_UPDATE_PROFILE_DATA = `${API_AUTH}/update_profile_data`;
const API_UPDATE_PASSWORD = `${API_AUTH}/update_password`;
const API_DELETE_USER_ACCOUNT = `${API_AUTH}/delete_user_account`;
const API_UPDATE_FORGOTTEN_PASSWORD = `${API_AUTH}/update_forgotten_password`;

export {
  API_CREATE_ACCOUNT,
  API_LOGIN,
  API_FORGOT_PASSWORD,
  API_VERIFY_TOKEN,
  API_UPDATE_PROFILE_DATA,
  API_UPDATE_PASSWORD,
  API_DELETE_USER_ACCOUNT,
  API_UPDATE_FORGOTTEN_PASSWORD,
};
