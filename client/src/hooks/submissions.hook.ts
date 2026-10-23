import { createSubmissions } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateSubmissions() {
  return useMutation({
    mutationFn: createSubmissions,
  });
}