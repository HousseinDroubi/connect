import { Comment } from "react-loader-spinner";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import Button from "./Button";

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
        {props.for !== "loading" && (
          <div className="h-80 w-[500px] bg-white rounded-md flex flex-col p-5">
            <header className="flex items-center">
              <h1 className="font-bold flex-grow text-center text-lg">
                {props.for === "confirmation"
                  ? "Confirm Action"
                  : props.for === "alert"
                  ? "Alert"
                  : props.for === "edit_message_for_user"
                  ? "Edit message"
                  : "Delete Message"}
              </h1>
              <div className="h-10 w-10 border-black border-[2px] rounded-full flex justify-center items-center self-end">
                <p className="cursor-pointer text-black font-bold">X</p>
              </div>
            </header>
            {(props.for === "alert" || props.for === "confirmation") && (
              <div className="mt-10">
                <p>{props.content}</p>
                <div
                  className={`flex items-center mt-10 ${
                    props.for === "alert" ? "justify-center" : "justify-around"
                  }`}
                >
                  {props.for === "alert" && (
                    <Button
                      button_text="Got it"
                      fn={() => {
                        props.setSeen(false);
                      }}
                    />
                  )}
                  {props.for === "confirmation" && (
                    <>
                      <Button
                        button_text="Cancel"
                        fn={() => {
                          props.setSeen(false);
                        }}
                      />
                      <Button
                        button_text="Confirm"
                        fn={props.confimationFunction}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default Popup;
