import { profileComponentInterface } from "../components/components.interfaces";

interface handleImageFunctionInterface extends profileComponentInterface {
  setPreviewURL: React.Dispatch<React.SetStateAction<string | null>>;
}

export type { handleImageFunctionInterface };
