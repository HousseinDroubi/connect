import { Router } from "express";
import { searchForUsers } from "../controllers/user.controller";
import {
  isUserAccountUnverifiedOrDeleted,
  isUserAuthenticated,
} from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/search/:content",
  isUserAuthenticated,
  isUserAccountUnverifiedOrDeleted,
  searchForUsers
);

export default router;
