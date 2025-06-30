import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import { useParams } from "react-router-dom";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import Popup from "../components/Popup";
import { showPopupText } from "../services/helpers/popup_helper";
import {
  showValidationForUpdateForgottenPasswordRequest,
  validateUpdateForgottenPassword,
} from "../services/helpers/validations/update_forgotten_password.validation";
import { updateForgottenPasswordRequestValidationError } from "../interfaces/validations_responses/update_forgotten_password_validtion_responses";

const UpdateForgottenPassword = () => {
  const { token } = useParams();
  const [passwordText, setPasswordText] = useState<string>("");
  const [confrimationPasswordText, setConfrimationPasswordText] =
    useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const changePassword = async () => {
    if (!token) {
      showPopupText(setPopupProps, "Token is required");
      return;
    }

    const data = {
      token,
      password: passwordText,
      confirmation_password: confrimationPasswordText,
    };

    const error = validateUpdateForgottenPassword(data).error?.details[0]
      .message as updateForgottenPasswordRequestValidationError;

    if (error) {
      showValidationForUpdateForgottenPasswordRequest(setPopupProps, error);
      return;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Update Password" />
      <section className="flex flex-col items-center justify-center w-fit h-100">
        <TextField
          title="New Password"
          hint="Enter new password"
          setText={setPasswordText}
          is_password
          value={passwordText}
        />
        <div className="mt-5">
          <TextField
            title="Confirmation Password"
            hint="Re-enter your new password"
            setText={setConfrimationPasswordText}
            is_password
            value={confrimationPasswordText}
          />
        </div>
        <div className="mt-5">
          <Button button_text="Change Password" fn={changePassword} />
        </div>
      </section>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default UpdateForgottenPassword;
