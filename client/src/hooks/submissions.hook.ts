import {
  createSubmissions,
  getAdminOverview,
  getAllSubmissions,
  getMentorOverview,
  getMentorReviewed,
  getMySubmissions,
  getSubmissionById,
} from "@/api";
import { SubmissionParams } from "@/types/submissions.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateSubmissions() {
  return useMutation({
    mutationFn: createSubmissions,
  });
}

export function useGetMySubmissions(params: SubmissionParams) {
  return useQuery({
    queryKey: ["my-submissions", params],
    queryFn: () => getMySubmissions(params),
    placeholderData: (previousData) => previousData,
  });
}
export function useGetAllSubmissions(params: SubmissionParams) {
  return useQuery({
    queryKey: ["all-submissions", params],
    queryFn: () => getAllSubmissions(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useGetSubmissionById(id: string) {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: () => getSubmissionById(id),
    enabled: Boolean(id),
  });
}

export function useGetMentorOverview() {
  return useQuery({
    queryKey: ["mentor-overview"],
    queryFn: getMentorOverview,
  });
}
export function useGetMyReviewed() {
  return useQuery({
    queryKey: ["mentor-review"],
    queryFn: getMentorReviewed,
  });
}

export function useGetAdminOverview() {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
  });
}
