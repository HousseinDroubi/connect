interface buttonComponentInterface {
  is_small?: boolean;
  button_text: string;
  fn: () => void;
}

interface titleBigComponentInterface {
  title: string;
}

interface logoComponentInterface {
  is_small?: boolean;
}

interface TextFieldComponentInterface {
  title: string;
  hint: string;
  is_password?: boolean;
  default_text?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface UnderlinedTextComponentInterface {
  text: string;
  href: string;
}

interface profileComponentInterface {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export type {
  buttonComponentInterface,
  titleBigComponentInterface,
  logoComponentInterface,
  TextFieldComponentInterface,
  UnderlinedTextComponentInterface,
  profileComponentInterface,
};
