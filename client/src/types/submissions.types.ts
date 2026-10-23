import { Dispatch, SetStateAction } from "react";

export interface CreateSubmissionPayload {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
}

export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface SubmissionParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: SubmissionStatus;
}

export interface Submission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface MySubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Submission[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SubmissionsTableProps {
  submissions: Submission[];
  page: number;
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  searchTerm: string;
}
