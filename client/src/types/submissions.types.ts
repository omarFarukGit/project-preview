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

export interface SubmissionDetails extends Submission {
  normalizedRepoUrl?: string;
  updatedAt?: string;
  student?: {
    id: string;
    name: string;
    email: string;
  };
  reviewedBy?: {
    id: string;
    name: string;
  } | null;
  feedbacks?: {
    id: string;
    comment: string;
    createdAt: string;
    updatedAt?: string;
    mentor?: {
      id: string;
      name: string;
    };
  }[];
}

export interface SubmissionProjectCardProps {
  submission: SubmissionDetails;
}
