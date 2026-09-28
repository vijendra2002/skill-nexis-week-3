import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadAvatar } from "../controllers/uploadController.js";

const router = Router();

router.post("/avatar", protect, upload.single("image"), uploadAvatar);

export default router;
