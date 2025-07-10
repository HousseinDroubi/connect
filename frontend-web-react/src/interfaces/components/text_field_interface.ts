interface textFieldComponentInterface {
  title?: string;
  hint: string;
  is_password?: boolean;
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage?: React.Dispatch<React.SetStateAction<File | null>>;
  is_full?: boolean;
  is_for_message?: boolean;
  doNextFunction: (() => any) | null;
}
export type { textFieldComponentInterface };
