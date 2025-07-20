import { titleComponentInterface } from "../interfaces/components/title_interface";

const Title: React.FC<titleComponentInterface> = ({ title, size }) => {
  return (
    <h1
      className={`font-bold ${
        size === "big"
          ? "text-2xl md:text-3xl"
          : size === "medium"
          ? "text-1xl sm:text-2xl"
          : "text-xl"
      } text-black`}
    >
      {title}
    </h1>
  );
};

export default Title;
