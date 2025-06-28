import { buttonInterface } from "../interfaces/components/components.interfaces";

const Button: React.FC<buttonInterface> = ({ fn, button_text, is_small }) => {
  return (
    <button
      onClick={fn}
      className={`bg-blue ${
        is_small ? "w-28" : "w-44"
      } h-10 rounded-md text-white cursor-pointer font-medium`}
    >
      {button_text}
    </button>
  );
};

export default Button;
