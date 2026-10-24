import { review } from "@/api/review.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof review>[1];
    }) => review(id, payload),

    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["submission", variables.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["submissions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-submissions"],
        }),
      ]);
    },
  });
}
