import z from "zod";

const createSubmissionSchema = z
  .object({
    projectName: z
      .string()
      .trim()
      .min(3, "Project name must be at least 3 characters")
      .max(100, "Project name cannot exceed 100 characters"),

    repoUrl: z
      .url("Please provide a valid repository URL")
      .trim()
      .refine((value) => {
        try {
          const url = new URL(value);

          return (
            url.protocol === "https:" &&
            url.hostname.toLowerCase() === "github.com" &&
            url.username === "" &&
            url.password === "" &&
            url.port === ""
          );
        } catch {
          return false;
        }
      }, "Repository URL must be a valid HTTPS GitHub URL"),

    liveUrl: z
      .url("Please provide a valid live project URL")
      .trim()
      .refine((value) => {
        try {
          const url = new URL(value);
          return (
            url.protocol === "https:" &&
            url.username === "" &&
            url.password === ""
          );
        } catch {
          return false;
        }
      }, "Live project URL must use HTTPS"),

    description: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description cannot exceed 2000 characters"),
  })
  .strict();

const submissionQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  searchTrem: z.string().trim().optional(),
  sortOrder: z.string().optional(),
  sortBy: z.string().optional(),
});
export const submissionsValidation = {
  createSubmissionSchema,
  submissionQuerySchema,
};
