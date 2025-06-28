interface buttonInterface {
  is_small?: boolean;
  button_text: string;
  fn: () => void;
}

interface titleBigInterface {
  title: string;
}

interface logoInterface {
  is_small?: boolean;
}

export { buttonInterface, titleBigInterface, logoInterface };
