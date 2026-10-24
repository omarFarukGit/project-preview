import z from "zod";

const promoteToMentorSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

const UpdateMyProfileZodSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),

    bio: z
      .string()
      .trim()
      .max(500, "Bio cannot exceed 500 characters")
      .nullable()
      .optional(),

    phone: z
      .string()
      .trim()
      .max(20, "Phone number cannot exceed 20 characters")
      .nullable()
      .optional(),

    country: z
      .string()
      .trim()
      .min(2, "Country must be at least 2 characters long")
      .max(100, "Country cannot exceed 100 characters")
      .nullable()
      .optional(),

    city: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters long")
      .max(100, "City cannot exceed 100 characters")
      .nullable()
      .optional(),

    address: z
      .string()
      .trim()
      .max(250, "Address cannot exceed 250 characters")
      .nullable()
      .optional(),

    githubUrl: z
      .url("Please provide a valid GitHub URL")
      .refine((url) => {
        const hostname = new URL(url).hostname.toLowerCase();
        return hostname === "github.com" || hostname === "www.github.com";
      }, "Please provide a valid GitHub profile URL")
      .nullable()
      .optional(),

    linkedinUrl: z
      .url("Please provide a valid LinkedIn URL")
      .refine((url) => {
        const hostname = new URL(url).hostname.toLowerCase();
        return hostname === "linkedin.com" || hostname === "www.linkedin.com";
      }, "Please provide a valid LinkedIn profile URL")
      .nullable()
      .optional(),

    portfolioUrl: z
      .url("Please provide a valid portfolio URL")
      .nullable()
      .optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field is required",
  });

export type IUpdateMyProfilePayload = z.infer<typeof UpdateMyProfileZodSchema>;

export const usersValidation = {
  promoteToMentorSchema,
  UpdateMyProfileZodSchema,
};
