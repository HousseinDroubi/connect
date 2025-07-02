import React from "react";
import { underlinedTextComponentInterface } from "../interfaces/components/underlined_text_interface";

const UnderlinedText: React.FC<underlinedTextComponentInterface> = ({
  text,
  href,
}) => {
  return (
    <a href={href} className="text-dusty_blue font-semibold text-lg underline">
      {text}
    </a>
  );
};

export default UnderlinedText;
