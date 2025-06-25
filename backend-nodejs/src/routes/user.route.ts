import { Router } from "express";
import { viewOtherUserProfile } from "../controllers/user.controller";
import {
  isUserAccountUnverifiedOrDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";
import { viewOtherUserProfileValidationMiddleware } from "../middlewares/validations/user.validation.middleware";

const router = Router();

router.get(
  "/view_other_user_profile/:user_id",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  viewOtherUserProfileValidationMiddleware,
  viewOtherUserProfile
);

export default router;
