import {Router} from "express";
import { viewOtherUserProfile } from "../controllers/user.controller";

const router = Router();

router.get("/view_other_user_profile/:user_id",viewOtherUserProfile);
export default router;