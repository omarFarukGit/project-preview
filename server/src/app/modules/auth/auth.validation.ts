import z from "zod";

const UserRegistrationZodSchema = z.object({
  name: z
    .string("Name must be a string")
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),

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

  bio: z
    .string()
    .trim()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters")
    .optional(),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters long")
    .max(100, "Country cannot exceed 100 characters")
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long")
    .max(100, "City cannot exceed 100 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .max(250, "Address cannot exceed 250 characters")
    .optional(),

  githubUrl: z
    .url("Please provide a valid GitHub URL")
    .trim()
    .max(2048, "GitHub URL is too long")
    .refine(
      (url) =>
        new URL(url).hostname.toLowerCase() === "github.com" ||
        new URL(url).hostname.toLowerCase() === "www.github.com",
      "Please provide a valid GitHub profile URL",
    )
    .optional(),

  linkedinUrl: z
    .url("Please provide a valid LinkedIn URL")
    .trim()
    .max(2048, "LinkedIn URL is too long")
    .refine((url) => {
      const hostname = new URL(url).hostname.toLowerCase();
      return hostname === "linkedin.com" || hostname === "www.linkedin.com";
    }, "Please provide a valid LinkedIn profile URL")
    .optional(),

  portfolioUrl: z
    .url("Please provide a valid portfolio URL")
    .trim()
    .max(2048, "Portfolio URL is too long")
    .optional(),
});

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
  UserRegistrationZodSchema,
  UserLoginZodSchema,
};
