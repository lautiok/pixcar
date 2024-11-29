import { z } from "zod";

export const createVehicleSchema = z.object({
  placa: z.string().min(6).max(10),
  color: z.string().min(3).max(20),
  modelo: z.string().min(3).max(20),
  cliente: z.string().min(3),
  marca: z.string().min(3).max(20),
  price: z.string().min(0).max(10000),
  kilometros: z.string().min(3).max(20),
  año: z.string().min(0).max(10000),
});
