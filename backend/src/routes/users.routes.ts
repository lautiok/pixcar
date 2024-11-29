import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controllers";
import { zodMiddleware } from "../middleware/zodMiddleware";
import { UserSchema } from "../schema/usersSchema";

const router = express.Router();

router.post("/", zodMiddleware(UserSchema), createUser);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
