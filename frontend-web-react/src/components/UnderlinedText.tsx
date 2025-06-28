import React from "react";
import { UnderlinedTextComponentInterface } from "../interfaces/components/components.interfaces";

const UnderlinedText: React.FC<UnderlinedTextComponentInterface> = ({
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
