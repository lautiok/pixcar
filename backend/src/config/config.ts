import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET || "pixcar",
  urlFrontend: process.env.URL_FRONTEND || "http://localhost:3000",
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
};
