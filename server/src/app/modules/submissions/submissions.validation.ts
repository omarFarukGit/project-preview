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

export const submissionsValidation = {
  createSubmissionSchema,
};
