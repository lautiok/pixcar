import { Request, Response } from "express";
import { VehicleRepository } from "../repositories/vehicleRepository";
import { VehicleService } from "../services/vehicleService";
import { VehicleRepositories } from "../types/vehiclesType";

const vehicleRepository: VehicleRepositories = new VehicleRepository();
const vehicleService = new VehicleService(vehicleRepository);

export const createVehicle = async (req: Request, res: Response) => {
  const { placa, color, modelo, cliente, marca, price, kilometros, año } =
    req.body;

  if (
    !placa ||
    !color ||
    !modelo ||
    !cliente ||
    !marca ||
    !price ||
    !kilometros ||
    !año
  ) {
    res.status(400).json({ message: "todos los campos son requeridos" });
    return;
  }

  try {
    const newVehicle = await vehicleService.create({
      placa,
      color,
      modelo,
      cliente,
      marca,
      price,
      kilometros,
      año,
    });
    res.json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al crear el vehiculo" });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al obtener los vehiculos" });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "El id es requerido" });
    return;
  }

  try {
    const vehicle = await vehicleService.findById(id);
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al obtener el vehiculo" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "El id es requerido" });
    return;
  }
  const { placa, color, modelo, status, marca, price, kilometros, año } =
    req.body;

  try {
    const updatedVehicle = await vehicleService.update(id, {
      placa,
      color,
      modelo,
      status,
      marca,
      price,
      kilometros,
      año,
    });
    res.json(updatedVehicle);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Hubo un error al actualizar el vehiculo" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "El id es requerido" });
    return;
  }
  try {
    await vehicleService.delete(id);
    res.json({ message: "Vehiculo eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al eliminar el vehiculo" });
  }
};

export const getVehicleByPlate = async (req: Request, res: Response) => {
  const { placa } = req.params;
  if (!placa) {
    res.status(400).json({ message: "La placa es requerida" });
    return;
  }

  try {
    const vehicle = await vehicleService.findByPlate(placa);
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Hubo un error al obtener el vehiculo" });
  }
};
