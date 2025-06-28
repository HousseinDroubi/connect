import React from "react";
import { UnderlinedTextComponentInterface } from "../interfaces/components/components.interfaces";

const UnderlinedText: React.FC<UnderlinedTextComponentInterface> = ({
  text,
  href,
}) => {
  return <a href={href}>{text}</a>;
};

export default UnderlinedText;
