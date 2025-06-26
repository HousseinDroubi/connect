import { userDocumentInterface } from "../documents/user.document.interface";
import { isUserAuthorizedToAccessConversationBodyInterace } from "../middlewares/conversation.middleware.interfaces";

interface uploadImageBodyInterface extends userDocumentInterface {
  file_name: string;
}

interface getConversationMessagesInterface
  extends isUserAuthorizedToAccessConversationBodyInterace {}

export { uploadImageBodyInterface, getConversationMessagesInterface };
