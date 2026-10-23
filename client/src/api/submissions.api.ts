import apiClient from "@/lib/apiClient";
import { CreateSubmissionPayload } from "@/types/submissions.types";

export function createSubmissions(payload: CreateSubmissionPayload) {
  return apiClient("/submissions", {
    method: "POST",
    body: payload,
  });
}
