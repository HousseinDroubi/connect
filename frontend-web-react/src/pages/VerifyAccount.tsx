import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import DoneIcon from "../assets/done.png";
import ErrorIcon from "../assets/error.png";
import WaitingIcon from "../assets/waiting.png";
import { useEffect, useState } from "react";
import { verifyAccountPageStyleInterface } from "../interfaces/pages/verify_account";
import { verifyAccountApi } from "../services/apis/verify_account";
import {
  showValidationForActivateAccountRequest,
  validateActivateAccount,
} from "../services/helpers/validations/verify_account.validation";
import { showPopupText } from "../services/helpers/popup_helper";
import { popupComponentInterface } from "../interfaces/components/components.interfaces";
import Popup from "../components/Popup";
import { activateAccountRequestValidationError } from "../interfaces/validations_responses/activate_account_validtion_responses";
import axios from "axios";
import Button from "../components/Button";

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pageStyle, setPageStyle] = useState<verifyAccountPageStyleInterface>({
    result: "waiting",
    content: "Verifying token...",
  });
  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const verifyAccount = async () => {
    if (!token) {
      showPopupText(setPopupProps, "Token is required");
      return;
    }
    const error = validateActivateAccount({ token }).error?.details[0]
      .message as activateAccountRequestValidationError;
    if (error) {
      showValidationForActivateAccountRequest(setPopupProps, error);
      return;
    }
    try {
      const response = await verifyAccountApi(token!);
      const data = response.data;
      if (response.status === 200 && data.result === "user_verified") {
        setPageStyle({
          result: "done",
          content: "Your account has been verified. You can login now!",
        });
        return;
      }
      throw new Error("Something went wrong");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 404) {
          if (error.response?.data.result === "token_not_found") {
            setPageStyle({ result: "error", content: "Invalid token" });
          } else if (error.response?.data.result === "user_not_found") {
            setPageStyle({ result: "error", content: "User not found" });
          }
          return;
        } else if (error.status === 406) {
          setPageStyle({ result: "error", content: "User already verified" });
          return;
        } else if (error.status === 405) {
          setPageStyle({ result: "error", content: "User account deleted" });
          return;
        }
        if (error.code === "ERR_NETWORK") {
          setPageStyle({ result: "error", content: "Server isn't available" });
          return;
        }
      }
      setPageStyle({ result: "error", content: "Something went wrong" });
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Title title="Verify your account" size="big" />
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
        {pageStyle.result == "done" && (
          <div className="mt-5">
            <Button
              button_text="Login"
              fn={() => {
                navigate("/");
              }}
            />
          </div>
        )}
      </section>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default VerifyAccount;
