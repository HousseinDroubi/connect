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

export {
  buttonComponentInterface,
  titleBigComponentInterface,
  logoComponentInterface,
};
