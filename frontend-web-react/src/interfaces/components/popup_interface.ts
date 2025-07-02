interface popupBasicComponentInterface {
  seen: boolean;
  setSeen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface popupContentComponentInterface {
  content: string;
}

interface popupLoadingComponentInterface extends popupBasicComponentInterface {
  for: "loading";
}

interface popupAlertComponentInterface
  extends popupBasicComponentInterface,
    popupContentComponentInterface {
  for: "alert";
  additionalFunction?: () => void;
}

interface popupConfirmationComponentInterface
  extends popupBasicComponentInterface,
    popupContentComponentInterface {
  for: "confirmation";
  confimationFunction: () => void;
}

interface popupDeleteMessageForAllComponentInterface
  extends popupBasicComponentInterface {
  for: "delete_message_for_other_user";
  deleteForMe: () => void;
  deleteForEveryOne: () => void;
}

interface popupDeleteMessageForUserComponentInterface
  extends popupBasicComponentInterface {
  for: "delete_message_for_user";
  deleteForMe: () => void;
}

interface popupEditMessageForUserComponentInterface
  extends popupBasicComponentInterface {
  for: "edit_message_for_user";
  setText: React.Dispatch<React.SetStateAction<string>>;
}

type popupComponentInterface =
  | popupLoadingComponentInterface
  | popupAlertComponentInterface
  | popupConfirmationComponentInterface
  | popupDeleteMessageForAllComponentInterface
  | popupDeleteMessageForUserComponentInterface
  | popupEditMessageForUserComponentInterface;

export type { popupComponentInterface };
