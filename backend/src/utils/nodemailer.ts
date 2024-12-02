import nodemailer from "nodemailer";
import { config } from "../config/config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});
