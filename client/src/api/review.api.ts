import apiClient from "@/lib/apiClient";

export interface ReviewSubmissionPayload {
  status: "APPROVED" | "REJECTED";
  feedback: string;
}

export function review(id: string, payload: ReviewSubmissionPayload) {
  return apiClient(`/submissions/${id}/review`, {
    method: "PATCH",
    body: { status: payload.status, feedback: payload.feedback },
  });
}
