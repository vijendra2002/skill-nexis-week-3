import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = Router();

router.use(protect);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
