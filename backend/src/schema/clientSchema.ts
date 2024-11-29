import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  identification: z.string().min(3).max(8),
});
