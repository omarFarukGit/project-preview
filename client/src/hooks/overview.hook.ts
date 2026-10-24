import { getAllReviewedSubmissions, getStudentOverview } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetStudentOverview() {
  return useQuery({
    queryKey: ["overview"],
    queryFn: getStudentOverview,
    retry: false,
  });
}

export function useGetAllReviewedSubmissions() {
  return useQuery({
    queryKey: ["admin-all-reviewed"],
    queryFn: getAllReviewedSubmissions,
  });
}
