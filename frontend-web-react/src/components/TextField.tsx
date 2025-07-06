import { textFieldComponentInterface } from "../interfaces/components/text_field_interface";
import OpenedEye from "../assets/opened_eye.png";
import ClosedEye from "../assets/closed_eye.png";
import { useState } from "react";

const TextField: React.FC<textFieldComponentInterface> = ({
  title,
  hint,
  is_password,
  value,
  setText,
  is_full,
  doNextFunction,
}) => {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const toggleEyeIcon = () => {
    setIsClosed(!isClosed);
  };
  return (
    <section className={`flex flex-col justify-between items-start`}>
      <p className="text-black font-medium text-base">{title}</p>
      <div
        className={`pl-3 pr-2 ${
          is_full ? `w-full` : `w-112`
        } h-12 bg-ice_blue mt-2 flex items-center rounded-md`}
      >
        <input
          className="bg-ice_blue h-full w-full border-none focus:border-none focus:outline-none text-dusty_blue font-semibold"
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
      </div>
    </section>
  );
};

export default TextField;
