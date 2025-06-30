import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import { forotPasswordBodyInterface } from "../interfaces/requests/forgot_password_request";
import {
  showValidationForForgotPasswordRequest,
  validateForgotPassword,
} from "../services/helpers/validations/forgot_password.validation";
import { forgotPasswordRequestValidationError } from "../interfaces/validations_responses/forgot_password_validtion_responses";

const ForgotPassword = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const forgotPassowrd = async () => {
    const body: forotPasswordBodyInterface = {
      email: emailText,
    };

    const error = validateForgotPassword(
      body
    ) as forgotPasswordRequestValidationError;

    if (error) {
      showValidationForForgotPasswordRequest(setPopupProps, error);
      return;
    }
  };

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
