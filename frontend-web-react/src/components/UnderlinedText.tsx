import React from "react";
import { underlinedTextComponentInterface } from "../interfaces/components/components.interfaces";

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
