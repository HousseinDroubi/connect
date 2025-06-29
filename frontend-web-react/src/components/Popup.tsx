import { popupComponentInterface } from "../interfaces/components/components.interfaces";

const Popup: React.FC<popupComponentInterface> = (props) => {
  if (!props.seen) return <></>;
  return props.seen && <div></div>;
};

export default Popup;
