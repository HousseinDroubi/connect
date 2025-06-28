import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";

const ForgotPassword = () => {
  const [emailText, setEmailText] = useState<string>("");

  const forgotPassowrd = () => {
    console.log(`email is ${emailText}`);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Forgot Password" />
      <section className="flex flex-col items-center justify-center w-fit h-48 ">
        <TextField
          title="Email"
          hint="Enter your email"
          setText={setEmailText}
        />
        <div className="mt-5">
          <Button button_text="Send email" fn={forgotPassowrd} />
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
