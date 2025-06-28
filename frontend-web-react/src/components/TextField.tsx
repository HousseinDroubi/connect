import { TextFieldComponentInterface } from "../interfaces/components/components.interfaces";

const TextField: React.FC<TextFieldComponentInterface> = ({
  title,
  hint,
  is_password,
  default_text,
}) => {
  return <input />;
};

export default TextField;
