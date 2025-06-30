import { SetPopupType } from "../../interfaces/general_types";

const showLoading = (setPopup: SetPopupType, is_visible: boolean) => {
  setPopup({
    for: "loading",
    seen: is_visible,
    setSeen: createSetSeen(setPopup),
  });
};

const showPopupText = (
  setPopup: SetPopupType,
  content: string,
  additionalFunction?: () => void
) => {
  setPopup({
    for: "alert",
    seen: true,
    content,
    additionalFunction,
    setSeen: createSetSeen(setPopup),
  });
};

const confirmPopupAction = (
  setPopup: SetPopupType,
  content: string,
  onConfirm: () => void
) => {
  setPopup({
    for: "confirmation",
    seen: true,
    content,
    confimationFunction: onConfirm,
    setSeen: createSetSeen(setPopup),
  });
};

const deleteMessageForMe = (
  setPopup: SetPopupType,
  deleteForMeFn: () => void
) => {
  setPopup({
    for: "delete_message_for_user",
    seen: true,
    deleteForMe: deleteForMeFn,
    setSeen: createSetSeen(setPopup),
  });
};

const deleteMessageForAll = (
  setPopup: SetPopupType,
  deleteForMeFn: () => void,
  deleteForEveryoneFn: () => void
) => {
  setPopup({
    for: "delete_message_for_other_user",
    seen: true,
    deleteForMe: deleteForMeFn,
    deleteForEveryOne: deleteForEveryoneFn,
    setSeen: createSetSeen(setPopup),
  });
};

const editMessage = (
  setPopup: SetPopupType,
  setTextFn: React.Dispatch<React.SetStateAction<string>>
) => {
  setPopup({
    for: "edit_message_for_user",
    seen: true,
    setText: setTextFn,
    setSeen: createSetSeen(setPopup),
  });
};

// Utility to create `setSeen` with proper typing
const createSetSeen = (setPopup: SetPopupType) => {
  return (value: React.SetStateAction<boolean>) => {
    setPopup((prev) => {
      if (!prev) return null;
      const seen = typeof value === "function" ? value(prev.seen) : value;
      return { ...prev, seen };
    });
  };
};

export {
  showLoading,
  showPopupText,
  confirmPopupAction,
  deleteMessageForMe,
  deleteMessageForAll,
  editMessage,
};
