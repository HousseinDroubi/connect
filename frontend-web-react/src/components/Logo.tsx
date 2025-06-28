import React from "react";
import { logoComponentInterface } from "../interfaces/components/components.interfaces";
import LogoImage from "../assets/logo.png";

const Logo: React.FC<logoComponentInterface> = ({ is_small }) => {
  return (
    <img
      width={is_small ? "30" : "40"}
      height={is_small ? "30" : "40"}
      src={LogoImage}
    />
  );
};

export default Logo;
