import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UIuserRepository } from "../types/usersTypes";
import bcrypt from "bcryptjs";

const userRepository: UIuserRepository = new UserRepository();
const userService = new UserService(userRepository);

export const createUser = async (req: Request, res: Response) => {
  const { name, identification, email, password, role } = req.body;

  if (!name || !identification || !email || !password || !role) {
    res.status(400).json({ message: "todos los campos son requeridos" });
    return;
  }

  if (await userService.findByIdentification(identification)) {
    res
      .status(400)
      .json({ message: "un usuario con esa identificacion ya existe" });
    return;
  }

  if (await userService.findbyemail(email)) {
    res.status(400).json({ message: "un usuario con esa email ya existe" });
    return;
  }

  if (!["admin", "seller", "mecanic"].includes(role)) {
    res.status(400).json({ message: "el rol no es valido" });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userService.create({
      name,
      identification,
      email,
      password: passwordHash,
      role,
    });
    res.json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: "hubo un error al crear el usuario" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();

    const PublicUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      identification: user.identification,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.json(PublicUsers);
  } catch (error: any) {
    res.status(400).json({ message: "hubo un error al obtener los usuarios" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.findById(id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: "hubo un error al obtener el usuario" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, identification, email, role } = req.body;

  try {
    const updatedUser = await userService.update(id, {
      name,
      identification,
      email,
      role,
    });
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: "hubo un error al actualizar el usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.delete(id);
    res.sendStatus(200);
  } catch (error: any) {
    res.status(400).json({ message: "hubo un error al eliminar el usuario" });
  }
};
