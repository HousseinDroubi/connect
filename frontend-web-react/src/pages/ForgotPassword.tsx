import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Title from "../components/Title";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import { forgotPasswordBodyInterface } from "../interfaces/requests/forgot_password_request";
import { forgotPasswordRequestValidationError } from "../interfaces/validations_responses/forgot_password_validtion_responses";
import { forgotPasswordApi } from "../services/apis/forgot_password";
import { showLoading, showPopupText } from "../services/helpers/popup_helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  showValidationForForgotPasswordRequest,
  validateForgotPassword,
} from "../services/validations/forgot_password_validation";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [emailText, setEmailText] = useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const forgotPassowrd = async () => {
    const body: forgotPasswordBodyInterface = {
      email: emailText,
    };

    const error = validateForgotPassword(
      body
    ) as forgotPasswordRequestValidationError;

    if (error) {
      showValidationForForgotPasswordRequest(setPopupProps, error);
      return;
    }
    showLoading(setPopupProps, true);
    try {
      const response = await forgotPasswordApi(body);
      showLoading(setPopupProps, false);
      if (response.data.result === "email_sent" && response.status == 201) {
        setEmailText("");
        showPopupText(
          setPopupProps,
          `Email sent to ${emailText}, please check your inbox and update password`,
          () => {
            navigate("/");
          }
        );
        return;
      } else throw new Error();
    } catch (error) {
      showLoading(setPopupProps, false);
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }
        if (error.status === 404) {
          showPopupText(setPopupProps, "No user found with this email");
          return;
        } else if (error.status === 405) {
          if (error.response?.data.result === "user_is_not_verified") {
            showPopupText(setPopupProps, "User is not verified yet.");
          } else if (error.response?.data.result === "user_account_deleted") {
            showPopupText(setPopupProps, "User account deleted");
          } else if (error.response?.data.result === "token_already_sent") {
            showPopupText(setPopupProps, "Already token sent to this email");
          }
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Title title="Forgot Password" size="big" />
      <section className="flex flex-col items-center justify-center w-fit h-52">
        <TextField
          title="Email"
          hint="Enter your email"
          setText={setEmailText}
          value={emailText}
          doNextFunction={forgotPassowrd}
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
