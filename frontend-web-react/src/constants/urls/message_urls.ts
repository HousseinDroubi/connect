import { API_BASE_URL } from "../basic_urls";

const API_AUTH = `${API_BASE_URL}/message`;

const API_VIEW_IMAGE = `${API_AUTH}/view_image`;
const API_DELETE_MESSAGE = `${API_AUTH}/delete_message_for_sender`;
const API_UPLOAD_IMAGE = `${API_AUTH}/upload_image`;

export { API_VIEW_IMAGE, API_DELETE_MESSAGE, API_UPLOAD_IMAGE };
