import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import { useNavigate, useParams } from "react-router-dom";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import Popup from "../components/Popup";
import { showLoading, showPopupText } from "../services/helpers/popup_helper";
import {
  showValidationForUpdateForgottenPasswordRequest,
  validateUpdateForgottenPassword,
} from "../services/helpers/validations/update_forgotten_password.validation";
import { updateForgottenPasswordRequestValidationError } from "../interfaces/validations_responses/update_forgotten_password_validtion_responses";
import { updateForgottenPasswordApi } from "../services/apis/update_forgotten_password";
import axios from "axios";

const UpdateForgottenPassword = () => {
  const navigate = useNavigate();
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
    showLoading(setPopupProps, true);
    try {
      const { confirmation_password, ...body } = data;
      const response = await updateForgottenPasswordApi(body);
      showLoading(setPopupProps, false);
      if (
        response.status === 202 &&
        response.data.result === "password_updated"
      ) {
        setPasswordText("");
        setConfrimationPasswordText("");
        showPopupText(
          setPopupProps,
          "Password updated. You can login now.",
          () => {
            navigate("/");
          }
        );
        return;
      }
      throw new Error();
    } catch (error) {
      showLoading(setPopupProps, false);
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 404) {
          if (error.response?.data.result === "token_not_found") {
            showPopupText(setPopupProps, "Token not found");
          } else if (error.response?.data.result === "user_not_found") {
            showPopupText(setPopupProps, "User not found");
          } else if (error.response?.data.result === "user_not_found") {
            showPopupText(setPopupProps, "User not found");
          }
          return;
        } else if (error.status === 405) {
          if (error.response?.data.result === "user_not_verified") {
            showPopupText(setPopupProps, "User is not verified yet.");
          } else if (error.response?.data.result === "user_account_deleted") {
            showPopupText(setPopupProps, "User account deleted");
          }
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
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
