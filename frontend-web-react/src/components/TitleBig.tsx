import { titleBigComponentInterface } from "../interfaces/components/components.interfaces";

const TitleBig: React.FC<titleBigComponentInterface> = ({ title }) => {
  return <h1 className="font-bold text-3xl text-black">{title}</h1>;
};

export default TitleBig;
