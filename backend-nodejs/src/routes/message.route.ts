import { Router } from "express";
import { uploadImage } from "../controllers/message.controller";

const router = Router();

router.post("/upload_image", uploadImage);
router.get("/view_image/:message_id", uploadImage);

export default router;
