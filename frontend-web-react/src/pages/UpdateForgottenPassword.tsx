import { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import TitleBig from "../components/TitleBig";
import { useParams } from "react-router-dom";

const UpdateForgottenPassword = () => {
  const { token } = useParams();
  const [password, setPasswordText] = useState<string>("");
  const [confrimationPasswordText, setConfrimationPasswordText] =
    useState<string>("");

  const changePassword = () => {
    console.log(`token is ${token}`);
    console.log(`password is ${password}`);
    console.log(`confirmation password is ${confrimationPasswordText}`);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Update Password" />
      <section className="flex flex-col items-center justify-center w-fit h-100">
        <TextField
          title="New Password"
          hint="Enter your email or pin"
          setText={setPasswordText}
          is_password
        />
        <div className="mt-5">
          <TextField
            title="Confirmation Password"
            hint="Re-enter your password"
            setText={setConfrimationPasswordText}
            is_password
          />
        </div>
        <div className="mt-5">
          <Button button_text="Change Password" fn={changePassword} />
        </div>
      </section>
    </div>
  );
};

export default UpdateForgottenPassword;
