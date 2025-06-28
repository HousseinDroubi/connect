import { titleBigInterface } from "../interfaces/components/components.interfaces";

const TitleBig: React.FC<titleBigInterface> = ({ title }) => {
  return <h2>{title}</h2>;
};

export default TitleBig;
