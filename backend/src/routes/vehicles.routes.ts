import express from "express";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleByPlate,
  updateVehicle,
} from "../controllers/vehicles.controllers";
import { zodMiddleware } from "../middleware/zodMiddleware";
import { createVehicleSchema } from "../schema/vehiclesSchema";

const router = express.Router();

router.post("/", zodMiddleware(createVehicleSchema), createVehicle);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/placa/:placa", getVehicleByPlate);

export default router;
