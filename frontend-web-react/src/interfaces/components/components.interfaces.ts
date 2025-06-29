interface buttonComponentInterface {
  button_text: string;
  fn: () => void;
  is_small?: boolean;
  is_disabled?: boolean;
  is_colored_red?: boolean;
}

interface titleBigComponentInterface {
  title: string;
}

interface logoComponentInterface {
  is_small?: boolean;
}

interface textFieldComponentInterface {
  title: string;
  hint: string;
  is_password?: boolean;
  default_text?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface underlinedTextComponentInterface {
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
  textFieldComponentInterface,
  underlinedTextComponentInterface,
  profileComponentInterface,
};
