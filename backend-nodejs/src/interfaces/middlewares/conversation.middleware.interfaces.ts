import { conversationDocumentInterface } from "../documents/conversation.document.interface";
import { userDocumentInterface } from "../documents/user.document.interface";

interface checkConversationExistenceBodyInterface {
  user: userDocumentInterface["user"];
  other_user?: userDocumentInterface["user"];
}

interface isUserAuthorizedToAccessConversationBodyInterace
  extends checkConversationExistenceBodyInterface {
  conversation: conversationDocumentInterface["conversation"];
}

export {
  checkConversationExistenceBodyInterface,
  isUserAuthorizedToAccessConversationBodyInterace,
};
