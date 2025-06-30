import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";

const ForgotPassword = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const forgotPassowrd = () => {};

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Forgot Password" />
      <section className="flex flex-col items-center justify-center w-fit h-52">
        <TextField
          title="Email"
          hint="Enter your email"
          setText={setEmailText}
          value={emailText}
        />
        <div className="mt-7">
          <Button button_text="Send email" fn={forgotPassowrd} />
        </div>
      </section>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default ForgotPassword;
