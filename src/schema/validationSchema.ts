import { z } from "zod";

export const regiterSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  // phone: z
  //   .string()
  //   .min(10, { message: "Phone number must be a minimum of 10 digits" })
  //   .regex(/^\+\d{3} \d{3} \d{4} \d{4}$/, {
  //     message: "Invalid phone number format",
  //   }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" }),
});

export default regiterSchema;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
});
