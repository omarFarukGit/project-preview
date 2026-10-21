import z from "zod";

const promoteToMentorSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

export const usersValidation = {
  promoteToMentorSchema,
};
