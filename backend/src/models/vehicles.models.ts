import mongoose, { Schema } from "mongoose";
import { Vehicle } from "../types/vehiclesType";

const vehicleSchema = new Schema<Vehicle>({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  placa: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  kilometros: {
    type: String,
    required: true,
  },
  año: {
    type: String,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  status: {
    type: String,
    enum: ["taller", "venta", "reservado"],
    default: "taller",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const VehicleModel = mongoose.model<Vehicle>("Vehicle", vehicleSchema);
