import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string()
  .min(2, "The name must have at least 2 characters.")
  .max(20, 'The name must have a maximum of 20 characters.'),
  surname: z
    .string()
    .min(2, "The surname must have at least 2 characters.")
    .max(20, 'The surname must have a maximum of 20 characters.'),
  email: z.string()
  .email("Invalid email format"),
  username: z.string()
    .min(2, "The username must have at least 2 characters.")
    .max(12, 'The username must have a maximum of 20 characters.'),
  phone: z.string(),
  password: z
  .string()
  .min(6, "The password must be at least 6 characters.")
  .max(12, "The password must have a maximum of 12 characters.")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/, "The password must have at least one uppercase letter, one lowercase letter and one number."),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});


