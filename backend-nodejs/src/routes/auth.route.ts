import {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
  verifyAccount,
  updateForgottenPassword,
} from "../controllers/auth.controller";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import {
  isUserAccountUnverifiedOrDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import {
  createAccountValidationMiddleware,
  forgotPasswordValidationMiddleware,
  loginValidationMiddleware,
  updateForgottenPasswordValidationMiddleware,
  updatePasswordValidationMiddleware,
  updateProfileDataValidationMiddleware,
  verifyAccountValidationMiddleware,
} from "../middlewares/validations/auth.validation.middleware";

const router = Router();

router.post("/login", loginValidationMiddleware, login);
router.post(
  "/create_new_account",
  upload.single("image"),
  createAccountValidationMiddleware,
  createNewAccount
);
router.get(
  "/verify_account/:token",
  verifyAccountValidationMiddleware,
  verifyAccount
);
router.post(
  "/forgot_password",
  forgotPasswordValidationMiddleware,
  forgotPassword
);

router.put(
  "/update_profile_data",
  upload.single("image"),
  updateProfileDataValidationMiddleware,
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  updateProfileData
);

router.put(
  "/update_password",
  updatePasswordValidationMiddleware,
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  updatePassword
);

router.delete(
  "/delete_user_account",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  deleteUserAccount
);

router.put(
  "/update_forgotten_password",
  updateForgottenPasswordValidationMiddleware,
  updateForgottenPassword
);

export default router;
