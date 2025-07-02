interface profileComponentInterface {
  image: File | string | null;
  setImage: React.Dispatch<React.SetStateAction<File | string | null>>;
}

export type { profileComponentInterface };
