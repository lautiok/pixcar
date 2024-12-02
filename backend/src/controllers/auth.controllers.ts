import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UIuserRepository } from "../types/usersTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { transporter } from "../utils/nodemailer";

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

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "el email es requerido" });
    return;
  }

  try {
    const user = await userService.findbyemail(email);

    if (!user) {
      res.status(400).json({ message: "el email no existe" });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    const url = `${config.urlFrontend}/reset-password?token=${token}`;

    const mailOptions = {
      from: config.mailUser,
      to: email,
      subject: "Restablecer contraseña",
      html: `<p>Hola ${user.name}, para restablecer tu contraseña haz click en el siguiente enlace:</p>
      <a href="${url}">Restablecer contraseña</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Se ha enviado el mail" });
  } catch (error) {
    res.status(400).json({ message: "Error al enviar el mail" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { newPassword, confirmPassword, token } = req.body;

  if (!newPassword || !confirmPassword) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ message: "Las contraseñas no coinciden" });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      email: string;
      id: string;
    };

    const user = await userService.findbyemail(decoded.email);

    if (!user || !user._id) {
      res.status(400).json({ message: "Usuario no encontrado o ID inválido" });
      return;
    }

    if (user._id.toString() !== decoded.id) {
      res.status(400).json({ message: "Token no válido" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await userService.updatePassword(
      decoded.id,
      hashedPassword
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al cambiar la contraseña" });
  }
};
