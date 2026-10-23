import apiClient from "@/lib/apiClient";
import {
  CreateSubmissionPayload,
  MySubmissionsResponse,
  SubmissionParams,
} from "@/types/submissions.types";

export function createSubmissions(payload: CreateSubmissionPayload) {
  return apiClient("/submissions", {
    method: "POST",
    body: payload,
  });
}

export function getMySubmissions(params: SubmissionParams) {
  return apiClient<MySubmissionsResponse>("/submissions/my-submissions", {
    query: {
      page: params.page,
      limit: params.limit,
      ...(params.searchTerm ? { searchTerm: params.searchTerm } : {}),
      ...(params.status ? { status: params.status } : {}),
    },
  });
}
