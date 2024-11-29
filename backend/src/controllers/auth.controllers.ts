import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UIuserRepository } from "../types/usersTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const userRepository: UIuserRepository = new UserRepository();
const userService = new UserService(userRepository);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "todos los campos son requeridos" });
    return;
  }

  try {
    const user = await userService.findbyemail(email);
    if (!user) {
      res.status(400).json({ message: "el email no existe" });
      return;
    }

    if (!user.password) {
      res.status(400).json({ message: "el usuario no tiene contraseña" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "contraseña incorrecta" });
      return;
    }

    const token = jwt.sign(
      {
        identification: user.identification,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      config.jwtSecret,
      {
        expiresIn: "24h",
      }
    );

    const PublicUser = {
      name: user.name,
      identification: user.identification,
      email: user.email,
      role: user.role,
      id: user._id,
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .send(PublicUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      name: string;
      identification: string;
      email: string;
      role: string | null;
    };
    res.status(200).json(decoded);
  } catch (error) {
    res.status(400).json({ message: "token no valido" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.sendStatus(200);
};
