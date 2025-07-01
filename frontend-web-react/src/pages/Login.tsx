import { useEffect, useState } from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import UnderlinedText from "../components/UnderlinedText";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import Popup from "../components/Popup";
import { loginBodyInterface } from "../interfaces/requests/login_request";
import {
  showValidationForLoginRequest,
  validateLogin,
} from "../services/helpers/validations/login.validation";
import { loginRequestValidationError } from "../interfaces/validations_responses/login_validtion_responses";
import useLogin from "../services/hooks/mutations/login_mutation";
import { showLoading } from "../services/helpers/popup_helper";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );
  const { mutate, isPending, isSuccess } = useLogin(setPopupProps);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending) showLoading(setPopupProps, true);
    else if (isSuccess) {
      navigate("/landing");
    }
  }, [isPending, isSuccess]);

  const login = async () => {
    console.log(`email is ${emailText}`);
    console.log(`password is ${passwordText}`);

    const body: loginBodyInterface = {
      email: emailText,
      password: passwordText,
    };
    const error = validateLogin(body) as loginRequestValidationError;
    if (error) {
      showValidationForLoginRequest(setPopupProps, error);
      return;
    }
    mutate(body);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <section className="flex justify-center items-center">
        <TitleBig title="Welcome to Connect" />
        <div className="ml-3">
          <Logo />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-fit h-100">
        <TextField
          title="Email or pin"
          hint="Enter your email or pin"
          setText={setEmailText}
          value={emailText}
        />
        <div className="mt-5">
          <TextField
            title="Password"
            hint="Enter your password"
            setText={setPasswordText}
            is_password
            value={passwordText}
          />
        </div>
        <div className="mt-7 flex justify-end w-full">
          <UnderlinedText text="Forgot password?" href="/forgot_password" />
        </div>
        <div className="mt-5">
          <Button button_text="Login" fn={login} is_disabled={isPending} />
        </div>
        <div className="mt-7 flex w-full justify-center">
          <UnderlinedText
            text="Don’t have an account? Sign up"
            href="/create_new_account"
          />
        </div>
      </section>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default Login;
