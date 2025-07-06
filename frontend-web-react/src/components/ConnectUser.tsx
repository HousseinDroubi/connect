import { connectUserComponentInterface } from "../interfaces/components/connect_user_interface";
import GroupIcon from "../assets/group.png";
import Title from "./Title";

const ConnectUser: React.FC<connectUserComponentInterface> = (props) => {
  return (
    <article
      className="flex flex-col cursor-pointer"
      onClick={
        props.for === "search" || props.for === "conversation"
          ? props.getConversationMessagesFunction
          : undefined
      }
    >
      <div className="flex h-32 items-center w-full">
        <section
          className={`size-24 ml-4 ${!props.is_group && "rounded-full"}`}
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
              <p className="mt-2 font-medium">{props.last_message_text}</p>
            ))}
          {props.for === "search" && (
            <p className="mt-2 font-medium">{`pin: #${props.pin}`}</p>
          )}
        </section>
      </div>
      <hr className="bg-black" />
    </article>
  );
};

export default ConnectUser;
