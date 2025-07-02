interface textFieldComponentInterface {
  title: string;
  hint: string;
  is_password?: boolean;
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
export type { textFieldComponentInterface };
