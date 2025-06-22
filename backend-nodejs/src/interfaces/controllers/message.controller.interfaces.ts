import { userDocumentInterface } from "../documents/user.document.interface";

interface uploadImageBodyInterface extends userDocumentInterface {
  file_name: string;
}

export { uploadImageBodyInterface };
