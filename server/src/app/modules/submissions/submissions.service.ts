import { Role, SubmissionStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { normalizeRepoUrl } from "../../utils/normalizeRepoUrl";
import { CreateSubmissionPayload } from "./submissions.interface";
import httpStatus from "http-status";

const createSubmissions = async (
  studentId: string,
  payload: CreateSubmissionPayload,
) => {
  const normalizedRepoUrl = normalizeRepoUrl(payload.repoUrl);

  const existingSubmission = await prisma.submission.findUnique({
    where: {
      studentId_normalizedRepoUrl: {
        studentId,
        normalizedRepoUrl,
      },
    },
  });

  if (existingSubmission) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already submitted this repository",
    );
  }
  const createSubmition = await prisma.submission.create({
    data: {
      projectName: payload.projectName.trim(),
      repoUrl: payload.repoUrl.trim(),
      normalizedRepoUrl,
      liveUrl: payload.liveUrl.trim(),
      description: payload.description.trim(),
      studentId,
      status: SubmissionStatus.PENDING,
    },
  });

  return createSubmition;
};

export const submissionsService = {
  createSubmissions,
};
