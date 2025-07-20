import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showPopupText } from "../../helpers/popup_helper";
import { SetPopupType } from "../../../interfaces/general_types";
import { queryClient } from "../../..";
import { updateProfileDataResponseInterface } from "../../../interfaces/responses/update_profile_data_response";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { updateProfileDataApi } from "../../apis/auth/update_profile_data";
import { updateProfileDataApiParamInterface } from "../../../interfaces/services/apis/update_profile_data_api_param";

const useUpdateProfileData = (
  setPopupProps: SetPopupType,
  navigate: NavigateFunction
) =>
  useMutation<
    updateProfileDataResponseInterface,
    Error,
    updateProfileDataApiParamInterface
  >({
    mutationFn: updateProfileDataApi,
    onSuccess(data) {
      if (data.result === "data_updated") {
        if (data.new_profile_url || data.new_username) {
          const existingUserData = queryClient.getQueryData<any>(["user_data"]);

          queryClient.setQueryData(["user_data"], {
            ...existingUserData,
            ...(data.new_profile_url && {
              profile_url: data.new_profile_url,
            }),
            ...(data.new_username && { username: data.new_username }),
          });
        }
        return;
      }
      throw new Error();
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          showPopupText(setPopupProps, "Server isn't available");
          return;
        }

        if (error.status === 401) {
          showPopupText(
            setPopupProps,
            "Session ended. Please login again.",
            () => {
              navigate("/");
            }
          );
          return;
        } else if (error.status === 404) {
          showPopupText(setPopupProps, "User not found");
          return;
        } else if (error.status === 405) {
          if (error.response?.data.result === "user_not_verified") {
            showPopupText(
              setPopupProps,
              "You are not verified yet. Please open your inbox and activate your account"
            );
          } else if (error.response?.data.result === "user_account_deleted") {
            showPopupText(setPopupProps, "Use account deleted");
          }
          return;
        }
      }
      showPopupText(setPopupProps, "Something went wrong");
    },
  });

export default useUpdateProfileData;
