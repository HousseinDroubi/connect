import TitleBig from "../components/TitleBig";
import { useParams } from "react-router-dom";
import DoneIcon from "../assets/done.png";
import ErrorIcon from "../assets/error.png";
import WaitingIcon from "../assets/waiting.png";
import { useEffect, useState } from "react";
import { verifyAccountPageStyleInterface } from "../interfaces/pages/verify_account";

const VerifyAccount = () => {
  const { token } = useParams();
  const [pageStyle, setPageStyle] = useState<verifyAccountPageStyleInterface>({
    result: "waiting",
    content: "Verifying token...",
  });

  const verifyAccount = async () => {};

  useEffect(() => {}, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <TitleBig title="Verify your account" />
      <section className="flex flex-col items-center justify-center w-fit h-80">
        <img
          src={
            pageStyle.result === "waiting"
              ? WaitingIcon
              : pageStyle.result === "done"
              ? DoneIcon
              : ErrorIcon
          }
          height={150}
          width={150}
        />
        <p className="mt-8">{pageStyle.content}</p>
      </section>
    </div>
  );
};

export default VerifyAccount;
