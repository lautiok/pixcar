import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(3, "minimo 3 caracteres")
    .max(50, "maximo 50 caracteres"),

  identification: z
    .string()
    .length(8, "la identificación debe tener 8 caracteres"),
  email: z.string().email("el email no es valido"),
  password: z
    .string()
    .min(6, "la contraseña debe tener al menos 6 caracteres")
    .max(50, "la contraseña debe tener un máximo de 50 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "debe contener al menos una letra mayúscula, una letra minúscula y un número"
    ),

  role: z.enum(["admin", "seller", "mecanic"]),
});
