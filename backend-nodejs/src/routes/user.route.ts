import { Router } from "express";
import {
  searchForUsers,
  viewOtherUserProfile,
} from "../controllers/user.controller";
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

router.get(
  "/search/:content",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  searchForUsers
);

export default router;
