import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "la contraseña debe tener al menos 6 caracteres")
    .max(50, "la contraseña debe tener un máximo de 50 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "debe contener al menos una letra mayúscula, una letra minúscula y un número"
    ),
});
