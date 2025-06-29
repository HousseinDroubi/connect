import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import Profile from "../components/Profile";
import { validateCreateAccount } from "../services/helpers/validations/create_account.validation";
import { createAccountBodyInterface } from "../interfaces/requests/create_account_request";
import { createAccountRequestValidationError } from "../interfaces/validations_responses/create_account_validtion_responses";
import Popup from "../components/Popup";

const CreateNewAccount = () => {
  const [image, setImage] = useState<File | null>(null);
  const [emailText, setEmailText] = useState<string>("");
  const [usernameText, setUsernameText] = useState<string>("");
  const [pinText, setPinText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");
  const [confirmationPasswordText, setConfirmationPasswordText] =
    useState<string>("");
  const [seen, setSeen] = useState<boolean>(false);
  const [popupText, setPopupText] = useState("");

  const showPopup = (text: string) => {
    setSeen(true);
    setPopupText(text);
  };

  const createNewAccount = () => {
    if (image) {
      const data: createAccountBodyInterface = {
        image,
        email: emailText,
        pin: pinText,
        username: usernameText,
        password: passwordText,
        confirmation_password: confirmationPasswordText,
      };
      const error = validateCreateAccount(
        data
      ) as createAccountRequestValidationError;
      console.log(error);
      if (error) {
        // Popup
      } else {
        // Send request
      }
    } else {
      // Popup
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Create New Account" />
      <div className="mt-5">
        <Profile image={image} setImage={setImage} />
      </div>
      <section className="flex flex-col items-center justify-center w-fit mt-3">
        <TextField
          title="Email"
          hint="Enter your email"
          setText={setEmailText}
        />
        <div className="mt-5">
          <TextField
            title="Username"
            hint="Enter your username"
            setText={setUsernameText}
          />
        </div>
        <div className="mt-5">
          <TextField title="Pin" hint="Enter your pin" setText={setPinText} />
        </div>
        <div className="mt-5">
          <TextField
            title="Password"
            hint="Enter your password"
            setText={setPasswordText}
            is_password
          />
        </div>
        <div className="mt-5">
          <TextField
            title="Confirmation Password"
            hint="Re-enter your password"
            setText={setConfirmationPasswordText}
            is_password
          />
        </div>
        <div className="mt-5">
          <Button button_text="Create new account" fn={createNewAccount} />
        </div>
      </section>
      <Popup seen={seen} setSeen={setSeen} for="alert" content={popupText} />
    </div>
  );
};

export default CreateNewAccount;
