interface buttonInterface {
  is_small?: boolean;
  button_text: string;
  fn: () => void;
}

interface titleBigInterface {
  title: string;
}

export { buttonInterface, titleBigInterface };
