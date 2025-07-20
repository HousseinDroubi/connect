import React from "react";
import LogoImage from "../assets/logo.png";

const Logo: React.FC = () => {
  return <img className="w-6 h-6 sm:w-10 sm:h-10" src={LogoImage} />;
};

export default Logo;
