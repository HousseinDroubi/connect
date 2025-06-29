import { buttonComponentInterface } from "../interfaces/components/components.interfaces";

const Button: React.FC<buttonComponentInterface> = ({
  fn,
  button_text,
  is_small,
  is_disabled,
  is_colored_red,
}) => {
  return (
    <button
      onClick={fn}
      className={`${is_colored_red ? "bg-red-600" : "bg-blue"} ${
        is_disabled && "bg-gray-300 cursor-not-allowed"
      } ${
        is_small ? "w-28" : "w-44"
      } h-10 rounded-md cursor-pointer text-white font-medium`}
    >
      {button_text}
    </button>
  );
};

export default Button;
