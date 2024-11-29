import express from "express";
import { login, logout, verifyToken } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/login", login);
router.post("/verifytoken", verifyToken);
router.post("/logout", logout);

export default router;
