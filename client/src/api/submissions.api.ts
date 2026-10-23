import apiClient from "@/lib/apiClient";
import {
  CreateSubmissionPayload,
  MySubmissionsResponse,
  SubmissionParams,
  SubmissionsApiResponse,
} from "@/types/submissions.types";

export function createSubmissions(payload: CreateSubmissionPayload) {
  return apiClient("/submissions", {
    method: "POST",
    body: payload,
  });
}

export function getAllSubmissions(params: SubmissionParams) {
  return apiClient<MySubmissionsResponse>("/submissions", {
    query: {
      page: params.page,
      limit: params.limit,
      ...(params.searchTerm ? { searchTerm: params.searchTerm } : {}),
      ...(params.status ? { status: params.status } : {}),
    },
  });
}
export function getMySubmissions(params: SubmissionParams) {
  return apiClient<SubmissionsApiResponse>("/submissions/my-submissions", {
    query: {
      page: params.page,
      limit: params.limit,
      ...(params.searchTerm ? { searchTerm: params.searchTerm } : {}),
      ...(params.status ? { status: params.status } : {}),
    },
  });
}

export function getSubmissionById(id: string) {
  return apiClient(`/submissions/${id}`);
}
