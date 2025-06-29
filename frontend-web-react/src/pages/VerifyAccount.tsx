import TitleBig from "../components/TitleBig";
import { useParams } from "react-router-dom";
import DoneIcon from "../assets/done.png";
import ErrorIcon from "../assets/error.png";
import { useEffect } from "react";

const VerifyAccount = () => {
  const { token } = useParams();
  useEffect(() => {
    console.log(token);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Verify your account" />
      <section className="flex flex-col items-center justify-center w-fit h-72">
        <img src={DoneIcon} height={200} width={200} />
        <p>Your account has been veified. You can login now</p>
      </section>
    </div>
  );
};

export default VerifyAccount;
