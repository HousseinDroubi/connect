import { textFieldComponentInterface } from "../interfaces/components/text_field_interface";
import OpenedEye from "../assets/opened_eye.png";
import ClosedEye from "../assets/closed_eye.png";
import SendMessageIcon from "../assets/send_message.png";
import GalleryIcon from "../assets/gallery.png";
import { useState } from "react";

const TextField: React.FC<textFieldComponentInterface> = ({
  title,
  hint,
  is_password,
  value,
  setText,
  setImage,
  is_full,
  is_for_message,
  doNextFunction,
}) => {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const toggleEyeIcon = () => {
    setIsClosed(!isClosed);
  };

  const setImageSrc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files !== null ? event.target.files[0] : null;

    if (
      file &&
      typeof file === "object" &&
      file.type.startsWith("image/") &&
      setImage
    ) {
      setImage(file);
    }
  };

  return (
    <section
      className={`flex flex-col justify-between items-start ${
        is_for_message && "fixed bottom-3 w-11/12 md:w-3/4"
      }`}
    >
      <p className="text-black font-medium text-base">{title}</p>
      <div
        className={`pl-3 pr-2 ${
          is_full ? `w-full` : `w-72 sm:w-96 md:w-112`
        } h-12 bg-ice_blue mt-2 flex items-center rounded-md`}
      >
        <input
          className="bg-ice_blue h-full w-full border-none focus:border-none focus:outline-none text-dusty_blue font-semibold placeholder:text-xs md:placeholder:text-base"
          value={value}
          type={is_password && isClosed ? "password" : "text"}
          placeholder={hint}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && doNextFunction) doNextFunction();
          }}
        />
        {is_password !== undefined && (
          <img
            src={isClosed ? ClosedEye : OpenedEye}
            className="cursor-pointer"
            onClick={toggleEyeIcon}
          />
        )}

        {is_for_message !== undefined &&
          (value === "" ? (
            <label htmlFor="gallery">
              <img
                src={GalleryIcon}
                alt="gallery"
                title="Send image"
                className="cursor-pointer size-6 md:size-10"
              />
              <input
                type="file"
                id="gallery"
                className="hidden"
                onChange={setImageSrc}
              />
            </label>
          ) : (
            <img
              src={SendMessageIcon}
              className="cursor-pointer size-6 md:size-10"
              onClick={() => doNextFunction}
            />
          ))}
      </div>
    </section>
  );
};

export default TextField;
