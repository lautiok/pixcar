import mongoose, { Schema } from "mongoose";
import { Client } from "../types/clientType";

const clientSchema = new Schema<Client>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
      unique: true,
    },
    vehicles: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const ClientModel = mongoose.model<Client>("Client", clientSchema);
