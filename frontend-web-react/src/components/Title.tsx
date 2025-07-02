import { titleComponentInterface } from "../interfaces/components/title_interface";

const Title: React.FC<titleComponentInterface> = ({ title, size }) => {
  return (
    <h1
      className={`font-bold ${
        size === "big" ? "text-3xl" : size === "medium" ? "text-2xl" : "text-xl"
      } text-black`}
    >
      {title}
    </h1>
  );
};

export default Title;
