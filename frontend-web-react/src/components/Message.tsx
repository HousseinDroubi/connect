import { useEffect, useState } from "react";
import { viewImageApi } from "../services/apis/message/view_image";
import logo from "../assets/logo.png";

const Message: React.FC<messageComponentInterface> = ({
  is_left,
  is_text,
  content,
  group_user,
  token,
  message_id,
}) => {
  const [imageSource, setImageSource] = useState<string>(logo);
  const getImageSource = async () => {
    const response = await viewImageApi({
      token,
      message_id,
    });
    setImageSource(response.data);
  };

  useEffect(() => {
    if (!is_text) {
      getImageSource();
    }
  }, []);
  return (
    <article
      className={`flex items-end w-7/12 ${
        is_left ? "self-start flex-row" : "self-end flex-row-reverse"
      }`}
    >
      {group_user && (
        <img src={group_user.profile_url} className="h-10 w-10 rounded-full" />
      )}
      <section
        className={`w-full flex flex-col items-start ${
          is_left ? "ml-2" : "mr-2"
        } ${is_text ? "min-h-20" : "h-72"} ${
          is_left ? "bg-ice_blue" : "bg-blue"
        } p-2`}
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
          <p className={`${is_left ? "text-black" : "text-white"}`}>
            {content}
          </p>
        ) : (
          <img src={imageSource} alt="img" className="w-full h-60" />
        )}
      </section>
    </article>
  );
};

export default Message;
