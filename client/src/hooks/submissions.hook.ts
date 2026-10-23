import { createSubmissions, getMySubmissions } from "@/api";
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
