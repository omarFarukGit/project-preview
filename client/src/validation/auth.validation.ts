import z from "zod";

const UserLoginZodSchema = z.object({
  email: z.email("Please provide a valid email").trim().toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
});

export const UserValidation = {
  UserLoginZodSchema,
};
