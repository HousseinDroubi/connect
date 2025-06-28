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
}

export {
  buttonComponentInterface,
  titleBigComponentInterface,
  logoComponentInterface,
  TextFieldComponentInterface,
};
