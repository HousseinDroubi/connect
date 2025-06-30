interface buttonComponentInterface {
  button_text: string;
  fn: () => void;
  is_small?: boolean;
  is_disabled?: boolean;
  is_colored_red?: boolean;
}

interface titleBigComponentInterface {
  title: string;
}

interface logoComponentInterface {
  is_small?: boolean;
}

interface textFieldComponentInterface {
  title: string;
  hint: string;
  is_password?: boolean;
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

interface underlinedTextComponentInterface {
  text: string;
  href: string;
}

interface profileComponentInterface {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

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

export type {
  buttonComponentInterface,
  titleBigComponentInterface,
  logoComponentInterface,
  textFieldComponentInterface,
  underlinedTextComponentInterface,
  profileComponentInterface,
  popupComponentInterface,
};
