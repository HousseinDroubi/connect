import { userDocumentInterface } from "../documents/user.document.interface";

interface checkConversationExistenceBodyInterface {
  user: userDocumentInterface["user"];
  other_user: userDocumentInterface["user"];
}

export { checkConversationExistenceBodyInterface };
