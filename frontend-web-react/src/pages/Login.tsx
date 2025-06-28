import { useState } from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import UnderlinedText from "../components/UnderlinedText";

const Login = () => {
  const [emailText, setEmailText] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string>("");

  const login = () => {
    console.log(`email is ${emailText}`);
    console.log(`password is ${passwordText}`);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <section className="flex justify-center items-center">
        <TitleBig title="Welcome to Connect" />
        <div className="ml-3">
          <Logo />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-fit h-96 ">
        <TextField
          title="Email or pin"
          hint="Enter your email or pin"
          setText={setEmailText}
        />
        <div className="mt-5">
          <TextField
            title="Password"
            hint="Enter your password"
            setText={setPasswordText}
            is_password
          />
        </div>
        <div className="mt-3 flex justify-end w-full">
          <UnderlinedText text="Forgot password?" href="/forgot_password" />
        </div>
        <div className="mt-3">
          <Button button_text="Login" fn={login} />
        </div>
        <div className="mt-5 flex w-full justify-center">
          <UnderlinedText
            text="Don’t have an account? Sign up"
            href="/create_new_account"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
