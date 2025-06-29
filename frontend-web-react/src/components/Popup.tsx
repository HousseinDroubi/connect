import { Comment } from "react-loader-spinner";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";

const Popup: React.FC<popupComponentInterface> = (props) => {
  if (!props.seen) return <></>;
  return (
    props.seen && (
      <div className="h-full w-full flex justify-center items-center bg-black bg-opacity-25 fixed backdrop-blur-sm">
        {props.for === "loading" && (
          <Comment
            height="80"
            width="80"
            color="#fff"
            backgroundColor="#0C7FF2"
          />
        )}
      </div>
    )
  );
};

export default Popup;
