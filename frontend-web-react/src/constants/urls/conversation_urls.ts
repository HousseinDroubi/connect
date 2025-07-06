import { API_BASE_URL } from "../basic_urls";

const API_AUTH = `${API_BASE_URL}/conversation`;

const API_GET_CONVERSATION_MESSAGES = `${API_AUTH}/get_messages`;
const API_DELETE_CONVERSATION = `${API_AUTH}/delete`;

export { API_GET_CONVERSATION_MESSAGES, API_DELETE_CONVERSATION };
