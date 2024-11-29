import express from "express";
import {
  createClient,
  deleteClient,
  findByEmail,
  getAllClients,
  getClientById,
  updateClient,
} from "../controllers/clients.controlers";
import { zodMiddleware } from "../middleware/zodMiddleware";
import { clientSchema } from "../schema/clientSchema";

const router = express.Router();

router.post("/", zodMiddleware(clientSchema), createClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.get("/email/:email", findByEmail);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
export default router;
