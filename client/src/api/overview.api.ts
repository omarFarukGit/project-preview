import apiClient from "@/lib/apiClient";

export function getStudentOverview() {
  return apiClient("/submissions/my-stats");
}

export function getMentorOverview() {
  return apiClient("/submissions/mentor-overview");
}
export function getMentorReviewed() {
  return apiClient("/submissions/my-reviewed");
}
