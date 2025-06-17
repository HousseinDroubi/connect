import {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
  verifyAccount,
} from "../controllers/auth.controller";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post("/login", login);
router.post("/create_new_account", upload.single("image"), createNewAccount);
router.get("/verify_account/:token", verifyAccount);
router.post("/forgot_password", forgotPassword);
router.put("/update_profile_data", updateProfileData);
router.put("/update_password", updatePassword);
router.delete("/delete_user_account", deleteUserAccount);

export default router;
