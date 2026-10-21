import { SubmissionStatus } from "../../../generated/prisma/enums";

export interface CreateSubmissionPayload {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
}

export interface SubmissionQuery {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
  searchTerm?: string;
  sortOrder?: string;
  sortBy?: string;
}
