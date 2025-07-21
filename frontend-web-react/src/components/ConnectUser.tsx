import { connectUserComponentInterface } from "../interfaces/components/connect_user_interface";
import GroupIcon from "../assets/group.png";
import Title from "./Title";
import { useEffect, useState } from "react";
import DeleteIcon from "../assets/delete.png";

const ConnectUser: React.FC<connectUserComponentInterface> = (props) => {
  const [topValue, setTopValue] = useState<number>(4.5);
  const [isDeleteShown, setIsDeleteShown] = useState<boolean>(false);

  const deleteConverstaion = () => {
    console.log(`Deleting converstaion`);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop >= 75) {
      setTopValue(0);
    } else if (scrollTop == 0) {
      setTopValue(18 * 0.25);
    }
  };

  useEffect(() => {
    if (props.for === "status") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <article
      onMouseEnter={() => setIsDeleteShown(true)}
      onMouseLeave={() => setIsDeleteShown(false)}
      className={`bg-body flex flex-col cursor-pointer transition-all duration-100 ease-in-out ${
        props.for === "status" && `fixed w-3/4`
      }`}
      style={props.for === "status" ? { top: `${topValue}rem` } : {}}
      onClick={
        props.for === "search" || props.for === "conversation"
          ? props.getConversationMessagesFunction
          : undefined
      }
    >
      <div className={`flex justify-between h-24 md:h-32 items-center w-full`}>
        <div className="flex items-center w-full">
          <section
            className={`size-20 md:size-24 ml-4 ${
              !props.is_group && "rounded-full"
            }`}
          >
            <img
              src={props.is_group ? GroupIcon : props.profile_url}
              alt=""
              className={`size-full ${!props.is_group && "rounded-full"}`}
            />
          </section>
          <section className="flex flex-col items-start justify-center h-full ml-4">
            <Title
              size="medium"
              title={props.is_group ? "Connected Users" : props.username!}
            />
            {props.for === "status" &&
              (props.is_group ? (
                <p className="italic">All connect users</p>
              ) : (
                <section className="flex items-center mt-2">
                  <div
                    className={`rounded-full size-3 ${
                      props.status ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></div>
                  <p className="ml-2">{props.status ? "Online" : "Offline"}</p>
                </section>
              ))}
            {props.for === "conversation" &&
              (!props.last_message_text ? (
                <p className="italic">No messages yet</p>
              ) : (
                <p
                  className={`mt-2 ${
                    props.last_message_text && props.is_last_message_deleted
                      ? "italic"
                      : " font-medium"
                  }`}
                >
                  {props.last_message_text}
                </p>
              ))}
            {props.for === "search" && (
              <p className="mt-2 font-medium">{`pin: #${props.pin}`}</p>
            )}
          </section>
        </div>
        <div>
          {props.for === "conversation" && !props.is_group && isDeleteShown && (
            <section
              className="self-end"
              onClick={(event) => {
                event.stopPropagation();
                deleteConverstaion();
              }}
            >
              <img src={DeleteIcon} alt="Delete" className="size-10" />
            </section>
          )}
        </div>
      </div>
      <hr className="bg-black" />
    </article>
  );
};

export default ConnectUser;
