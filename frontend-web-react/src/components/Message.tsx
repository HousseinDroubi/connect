import { useEffect, useState } from "react";
import { viewImageApi } from "../services/apis/message/view_image";
import logo from "../assets/logo.png";
import DeleteIcon from "../assets/delete.png";
import EditIcon from "../assets/edit.png";

const Message: React.FC<messageComponentInterface> = ({
  is_left,
  is_text,
  content,
  group_user,
  token,
  message_id,
  is_first_message,
  is_last_image,
  is_deleted_for_all,
  onEdit,
  onDelete,
}) => {
  const [imageSource, setImageSource] = useState<string>(logo);
  const [isControlShown, setIsControlShown] = useState<boolean>(false);

  const getImageSource = async () => {
    const response = await viewImageApi({
      token,
      message_id,
    });
    setImageSource(URL.createObjectURL(response.data));
  };

  useEffect(() => {
    if (!is_text) {
      getImageSource();
    }
  }, []);
  return (
    <article
      onMouseEnter={() => {
        setIsControlShown(true);
      }}
      onMouseLeave={() => {
        setIsControlShown(false);
      }}
      className={`${!is_first_message && "mt-3"} ${
        is_last_image && "mb-20"
      } flex items-end w-7/12 ${
        is_left ? "self-start flex-row" : "self-end flex-row-reverse"
      }`}
    >
      {group_user && (
        <img src={group_user.profile_url} className="h-10 w-10 rounded-full" />
      )}
      <section
        className={`
          ${group_user && is_left && "ml-5"}
              ${isControlShown ? "translate-x-0" : "-translate-x-2"} 
    pointer-events-none
          transition-all duration-200 ease-in-out rounded-lg w-full flex flex-col items-start ${
            group_user ? "justify-around" : "justify-center"
          } ${is_left ? "ml-2" : "mr-2"} ${
          is_text ? (group_user ? "min-h-20" : "min-h-16") : "h-72"
        } ${is_left ? "bg-ice_blue" : "bg-blue"} p-2`}
      >
        {group_user && (
          <p
            className={`text-lg font-bold ${
              is_left ? "text-black" : "text-white"
            }`}
          >
            {group_user.username}
          </p>
        )}
        {is_text ? (
          <p
            className={`${is_left ? "text-black" : "text-white"} ${
              is_deleted_for_all && "italic"
            }`}
          >
            {content}
          </p>
        ) : (
          <img src={imageSource} alt="img" className="w-full h-60" />
        )}
      </section>
      {isControlShown && (
        <section className={`flex ${!is_left && "flex-row-reverse"}`}>
          {!is_left && (
            <img
              onClick={onEdit}
              src={EditIcon}
              width={30}
              height={30}
              className={`${is_left ? "ml-2" : "mr-2"} cursor-pointer`}
            />
          )}
          <img
            onClick={onDelete}
            src={DeleteIcon}
            width={30}
            height={30}
            className={`${is_left ? "ml-2" : "mr-4"} cursor-pointer`}
          />
        </section>
      )}
    </article>
  );
};

export default Message;
