import { Request, Response } from "express";
import { ClientRepository } from "../repositories/clientRepository";
import { ClientService } from "../services/clientService";
import { ClientRepositories } from "../types/clientType";

const clientRepository: ClientRepositories = new ClientRepository();
const clientService = new ClientService(clientRepository);

export const createClient = async (req: Request, res: Response) => {
  const { name, email, identification } = req.body;
  if (!name || !email || !identification) {
    res.status(400).json({ message: "todos los campos son requeridos" });
    return;
  }
  try {
    const newClient = await clientService.create({
      name,
      email,
      identification,
    });
    res.json(newClient);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al crear el cliente" });
  }
};

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.findAll();
    const PublicClients = clients.map((client) => ({
      id: client._id,
      name: client.name,
      email: client.email,
      identification: client.identification,
      createdAt: client.createdAt,
      vehicles: client.vehicles,
    }));
    res.json(PublicClients);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al obtener los clientes" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const client = await clientService.findById(id);
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al obtener el cliente" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, identification } = req.body;

  try {
    const updatedClient = await clientService.update(id, {
      name,
      email,
      identification,
    });
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al actualizar el cliente" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await clientService.delete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al eliminar el cliente" });
  }
};

export const findByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const client = await clientService.findbyemail(email);
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: "hubo un error al obtener el cliente" });
  }
};
