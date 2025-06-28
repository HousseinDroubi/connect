import { buttonInterface } from "../interfaces/components/components.interfaces";

const Button: React.FC<buttonInterface> = ({ fn, button_text }) => {
  return <button onClick={fn}>{button_text}</button>;
};

export default Button;
