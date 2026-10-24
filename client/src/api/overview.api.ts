import apiClient from "@/lib/apiClient";

export function getStudentOverview() {
  return apiClient("/submissions/my-stats");
}
