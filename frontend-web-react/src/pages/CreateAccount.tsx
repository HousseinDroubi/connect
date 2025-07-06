import { useEffect, useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Title from "../components/Title";
import Profile from "../components/Profile";
import {
  showValidationForCreateAccountRequest,
  validateCreateAccount,
} from "../services/validations/create_account_validation";
import { createAccountBodyInterface } from "../interfaces/requests/create_account_request";
import { createAccountRequestValidationError } from "../interfaces/validations_responses/create_account_validtion_responses";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import { showLoading, showPopupText } from "../services/helpers/popup_helper";
import { objectToFormData } from "../utils/functions";
import { createAccountApi } from "../services/apis/create_account";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNewAccount = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | string | null>(null);
  const [emailText, setEmailText] = useState<string>("");
  const [usernameText, setUsernameText] = useState<string>("");
  const [pinText, setPinText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");
  const [confirmationPasswordText, setConfirmationPasswordText] =
    useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const createNewAccount = async () => {
    if (image) {
      const data: createAccountBodyInterface = {
        image: image as File,
        email: emailText,
        pin: pinText,
        username: usernameText,
        password: passwordText,
        confirmation_password: confirmationPasswordText,
      };
      const error = validateCreateAccount(
        data
      ) as createAccountRequestValidationError;

      if (error) {
        showValidationForCreateAccountRequest(setPopupProps, error);
      } else {
        showLoading(setPopupProps, true);
        const { confirmation_password, ...request_body } = data;
        const formData = objectToFormData(request_body);
        try {
          const response = await createAccountApi(formData);
          showLoading(setPopupProps, false);
          const data = response.data;
          if (data.result === "account_created" && response.status === 201) {
            showPopupText(
              setPopupProps,
              `Email sent to ${emailText}, please open your inbox and verify it`,
              () => {
                navigate("/");
              }
            );
            setImage(null);
            setEmailText("");
            setPinText("");
            setUsernameText("");
            setPasswordText("");
            setConfirmationPasswordText("");
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            showLoading(setPopupProps, false);
            if (error.status === 405) {
              showPopupText(setPopupProps, "Pin or email is taken");
              return;
            }
            if (error.code === "ERR_NETWORK") {
              showPopupText(setPopupProps, "Server isn't available");
              return;
            }
          }
          showPopupText(setPopupProps, "Something went wrong");
        }
      }
    } else {
      showPopupText(setPopupProps, "Image is required");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Title title="Create New Account" size="big" />
      <div className="mt-5">
        <Profile image={image} setImage={setImage} />
      </div>
      <section className="flex flex-col items-center justify-center w-fit mt-3">
        <TextField
          title="Email"
          hint="Enter your email"
          setText={setEmailText}
          value={emailText}
          doNextFunction={createNewAccount}
        />
        <div className="mt-5">
          <TextField
            title="Username"
            hint="Enter your username"
            setText={setUsernameText}
            value={usernameText}
            doNextFunction={createNewAccount}
          />
        </div>
        <div className="mt-5">
          <TextField
            title="Pin"
            hint="Enter your pin"
            setText={setPinText}
            value={pinText}
            doNextFunction={createNewAccount}
          />
        </div>
        <div className="mt-5">
          <TextField
            title="Password"
            hint="Enter your password"
            setText={setPasswordText}
            is_password
            value={passwordText}
            doNextFunction={createNewAccount}
          />
        </div>
        <div className="mt-5">
          <TextField
            title="Confirmation Password"
            hint="Re-enter your password"
            setText={setConfirmationPasswordText}
            is_password
            value={confirmationPasswordText}
            doNextFunction={createNewAccount}
          />
        </div>
        <div className="mt-5">
          <Button button_text="Create new account" fn={createNewAccount} />
        </div>
      </section>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default CreateNewAccount;
