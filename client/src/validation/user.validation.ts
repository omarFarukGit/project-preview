import z from "zod";

const requiredTextSchema = (label: string, maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(maxLength, `${label} must not exceed ${maxLength} characters.`);

const requiredUrlSchema = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(2048, `${label} must not exceed 2048 characters.`)
    .refine((value) => {
      try {
        const url = new URL(value);

        return (
          (url.protocol === "https:" || url.protocol === "http:") &&
          url.hostname.includes(".")
        );
      } catch {
        return false;
      }
    }, "Enter a valid URL starting with http:// or https://.");

export const updateProfileSchema = z.object({
  name: requiredTextSchema("Name", 50).pipe(
    z.string().min(2, "Name must be at least 2 characters."),
  ),

  bio: requiredTextSchema("Bio", 500),
  phone: requiredTextSchema("Phone", 20),
  country: requiredTextSchema("Country", 100),
  city: requiredTextSchema("City", 100),
  address: requiredTextSchema("Address", 250),

  githubUrl: requiredUrlSchema("GitHub URL"),
  linkedinUrl: requiredUrlSchema("LinkedIn URL"),
  portfolioUrl: requiredUrlSchema("Portfolio URL"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
