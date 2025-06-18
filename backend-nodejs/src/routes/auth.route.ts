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
import { isUserAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/create_new_account", upload.single("image"), createNewAccount);
router.get("/verify_account/:token", verifyAccount);
router.post("/forgot_password", forgotPassword);
router.put(
  "/update_profile_data",
  upload.single("image"),
  isUserAuthenticated,
  updateProfileData
);
router.put("/update_password", isUserAuthenticated, updatePassword);
router.delete("/delete_user_account", isUserAuthenticated, deleteUserAccount);
router.put("/update_forgotten_password", updateForgottenPassword);
export default router;
