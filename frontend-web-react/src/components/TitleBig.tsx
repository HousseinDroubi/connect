import { titleBigInterface } from "../interfaces/components/components.interfaces";

const TitleBig: React.FC<titleBigInterface> = ({ title }) => {
  return <h1 className="font-bold text-3xl">{title}</h1>;
};

export default TitleBig;
