import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useUserData from "../services/hooks/queries/user_data_query";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import ProfileComponent from "../components/Profile";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Popup from "../components/Popup";
import { popupComponentInterface } from "../interfaces/components/popup_interface";
import {
  confirmPopupAction,
  showLoading,
  showPopupText,
} from "../services/helpers/popup_helper";
import { updateProfileDataBodyInterface } from "../interfaces/requests/update_profile_data_request";
import {
  showValidationForUpdateProfileDataRequest,
  validateUpdateProfileData,
} from "../services/validations/update_user_data_validation";
import { updateProfileDataRequestValidationError } from "../interfaces/validations_responses/update_profile_data_validtion_responses";
import { objectToFormData } from "../utils/functions";
import useUpdateProfileData from "../services/hooks/mutations/update_profile_data_mutation";
import { updatePasswordBodyInterface } from "../interfaces/requests/update_password_request";
import {
  showValidationForUpdatePasswordRequest,
  validateUpdatePassword,
} from "../services/validations/update_password_validation";
import { updatePasswordRequestValidationError } from "../interfaces/validations_responses/update_password_validtion_responses";
import useUpdatePassword from "../services/hooks/mutations/update_password_mutation";
import useDeleteAccount from "../services/hooks/mutations/delete_account_mutation";

const Profile = () => {
  const navigate = useNavigate();
  const { data } = useUserData();
  const [image, setImage] = useState<File | string | null>(null);
  const [usernameText, setUsernameText] = useState<string>("");
  const [currentPasswordText, setCurrentPasswordText] = useState<string>("");
  const [newPasswordText, setNewPasswordText] = useState<string>("");
  const [confirmationPasswordText, setConfirmationPasswordText] =
    useState<string>("");

  const [popupProps, setPopupProps] = useState<popupComponentInterface | null>(
    null
  );

  const {
    isPending: updateProfileDataIsPending,
    isSuccess: updateProfileDataIsSuccess,
    isError: updateProfileDataIsError,
    mutate: updateProfileDataMutate,
  } = useUpdateProfileData(setPopupProps, navigate);

  const {
    isPending: updatePasswordIsPending,
    isSuccess: updatePasswordIsSuccess,
    isError: updatePasswordIsError,
    mutate: updatePasswordMutate,
  } = useUpdatePassword(setPopupProps, navigate);

  const { isPending: deleteAccountIsPending, mutate: deleteAccountMutate } =
    useDeleteAccount(setPopupProps, navigate);

  useEffect(() => {
    if (data === null) {
      navigate("/");
    } else {
      setImage(data?.profile_url as string);
      setUsernameText(data?.username || "");
    }
  }, [data]);

  useEffect(() => {
    if (
      updatePasswordIsPending ||
      updateProfileDataIsPending ||
      deleteAccountIsPending
    )
      showLoading(setPopupProps, true);

    if (updatePasswordIsSuccess) {
      setCurrentPasswordText("");
      setNewPasswordText("");
      setConfirmationPasswordText("");
    }

    if (
      (updatePasswordIsSuccess && !updatePasswordIsError) ||
      (updateProfileDataIsSuccess && updateProfileDataIsError)
    ) {
      showLoading(setPopupProps, false);
    }
  }, [
    updateProfileDataIsPending,
    updatePasswordIsPending,
    updatePasswordIsSuccess,
    updateProfileDataIsSuccess,
  ]);

  const updateUserData = () => {
    if (typeof image !== "object" && data!.username == usernameText) {
      showPopupText(
        setPopupProps,
        "Please update image and/or username to continue."
      );
      return;
    }

    const body: updateProfileDataBodyInterface = {};
    if (typeof image === "object") body.image = image as File;
    if (data!.username != usernameText) body.username = usernameText;

    const error = validateUpdateProfileData(body).error?.details[0]
      .message as updateProfileDataRequestValidationError;

    if (error) {
      showValidationForUpdateProfileDataRequest(setPopupProps, error);
      return;
    }

    const formData = objectToFormData(body);
    updateProfileDataMutate({ formData, token: data!.token });
  };

  const updateUserPassword = () => {
    const temp_data: updatePasswordBodyInterface = {
      old_password: currentPasswordText,
      new_password: newPasswordText,
      confirmation_new_password: confirmationPasswordText,
    };

    const error = validateUpdatePassword(temp_data).error?.details[0]
      .message as updatePasswordRequestValidationError;

    if (error) {
      showValidationForUpdatePasswordRequest(setPopupProps, error);
      return;
    }

    const { confirmation_new_password, ...body } = temp_data;

    updatePasswordMutate({ body, token: data!.token });
  };

  const deleteUserAccount = () => {
    deleteAccountMutate(data!.token);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Nav profile_url={data?.profile_url} />
      <div className="w-full h-full flex justify-center">
        <section className="w-3/4 h-full mt-10">
          <Title title="Edit Profile" size="big" />
          <article className="w-full flex flex-col items-center">
            <ProfileComponent image={image} setImage={setImage} />
            <div className="mt-5">
              <TextField
                title="Username"
                hint="Enter your username"
                value={usernameText}
                setText={setUsernameText}
              />
            </div>
            <div className="mt-8">
              <Button
                button_text="Save changes"
                fn={updateUserData}
                is_disabled={updateProfileDataIsPending}
              />
            </div>
          </article>
          <div className="mt-10">
            <Title title="Update Password" size="big" />
            <article className="w-full flex flex-col items-center">
              <div className="mt-5">
                <TextField
                  is_password
                  title="Current Password"
                  hint="Enter your current password"
                  value={currentPasswordText}
                  setText={setCurrentPasswordText}
                />
              </div>
              <div className="mt-5">
                <TextField
                  is_password
                  title="New Password"
                  hint="Enter a new password"
                  value={newPasswordText}
                  setText={setNewPasswordText}
                />
              </div>
              <div className="mt-5">
                <TextField
                  is_password
                  title="Confirmation Password"
                  hint="Re-enter new password"
                  value={confirmationPasswordText}
                  setText={setConfirmationPasswordText}
                />
              </div>
              <div className="mt-8">
                <Button
                  button_text="Update password"
                  fn={updateUserPassword}
                  is_disabled={updatePasswordIsPending}
                />
              </div>
              <div className="mt-10 mb-10">
                <Button
                  is_disabled={deleteAccountIsPending}
                  button_text="Delete Account"
                  fn={() => {
                    confirmPopupAction(
                      setPopupProps,
                      "This action will delete your account forever. Confirm?",
                      () => {
                        deleteUserAccount();
                      }
                    );
                  }}
                  is_colored_red
                />
              </div>
            </article>
          </div>
        </section>
      </div>
      {popupProps && <Popup {...popupProps} />}
    </div>
  );
};

export default Profile;
