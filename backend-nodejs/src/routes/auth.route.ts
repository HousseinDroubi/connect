import {
  login,
  createNewAccount,
  forgotPassword,
  updateProfileData,
  updatePassword,
  deleteUserAccount,
} from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", login);
router.post("/create_new_account", createNewAccount);
router.post("/forgot_password", forgotPassword);
router.put("/update_profile_data", updateProfileData);
router.put("/update_password", updatePassword);
router.delete("/delete_user_account", deleteUserAccount);

export default router;
