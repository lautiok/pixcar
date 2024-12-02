import express from "express";
import {
  changePassword,
  forgetPassword,
  login,
  logout,
  verifyToken,
} from "../controllers/auth.controllers";

const router = express.Router();

router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/change-password", changePassword);
router.post("/verifytoken", verifyToken);
router.post("/logout", logout);

export default router;
