import { profileComponentInterface } from "../components/profile_interface";

interface handleImageFunctionInterface extends profileComponentInterface {
  setPreviewURL: React.Dispatch<React.SetStateAction<string | null>>;
}

export type { handleImageFunctionInterface };
