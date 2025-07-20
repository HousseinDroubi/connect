interface buttonComponentInterface {
  button_text: string;
  fn: () => void;
  is_disabled?: boolean;
  is_colored_red?: boolean;
}

export type { buttonComponentInterface };
