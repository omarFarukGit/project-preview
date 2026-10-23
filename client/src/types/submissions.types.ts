import type { Dispatch, SetStateAction } from "react";

// Submission Status
export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

// Create Submission Payload
export interface CreateSubmissionPayload {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
}

// Submission Query Params
export interface SubmissionParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: SubmissionStatus;
}

// Student Information
export interface SubmissionStudent {
  id: string;
  name: string;
  email: string;
}

// Reviewer Information
export interface SubmissionReviewer {
  id: string;
  name: string;
}

// Pagination Metadata
export interface SubmissionsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Base Submission
export interface Submission {
  id: string;
  projectName: string;
  repoUrl: string;
  normalizedRepoUrl: string;
  liveUrl: string;
  description: string;
  status: SubmissionStatus;
  studentId: string;
  reviewedById: string | null;
  createdAt: string;
  updatedAt: string;
}

// Submission with Student and Reviewer
export interface SubmissionWithRelations extends Submission {
  student: SubmissionStudent;
  reviewedBy: SubmissionReviewer | null;
}

// Reusable API Response
export interface SubmissionsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Submission[];
  meta: SubmissionsMeta;
}

// My Submissions API Response
export type MySubmissionsResponse = SubmissionsApiResponse;

// All Submissions API Response
export type AllSubmissionsResponse = SubmissionsApiResponse;

// Feedback
export interface SubmissionFeedback {
  id: string;
  comment: string;
  submissionId?: string;
  mentorId?: string;
  createdAt: string;
  updatedAt?: string;
  mentor?: SubmissionReviewer;
}

// Submission Details
export interface SubmissionDetails extends SubmissionWithRelations {
  feedbacks?: SubmissionFeedback[];
}

// Submissions Table Props
export interface SubmissionsTableProps {
  submissions: Submission[];
  page: number;
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  searchTerm: string;
}

// Mentor Submissions Table Props
export interface MentorSubmissionsTableProps {
  submissions: SubmissionWithRelations[];
  page: number;
  totalPages: number;
  handlePageChange: Dispatch<SetStateAction<number>>;
  searchTerm: string;
}

// Submission Project Card Props
export interface SubmissionProjectCardProps {
  submission: SubmissionDetails;
}
