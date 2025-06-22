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
  isUserAccountDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import {
  createAccountValidationMiddleware,
  forgotPasswordValidationMiddleware,
  loginValidationMiddleware,
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
  isUserAccountDeleted,
  updateProfileData
);
router.put(
  "/update_password",
  updatePasswordValidationMiddleware,
  isUserAuthenticated,
  isUserAccountDeleted,
  updatePassword
);
router.delete(
  "/delete_user_account",
  isUserAuthenticated,
  isUserAccountDeleted,
  deleteUserAccount
);
router.put("/update_forgotten_password", updateForgottenPassword);
export default router;
