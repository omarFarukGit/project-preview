import {
  activeUser,
  blockUser,
  deleteUser,
  getAllUsers,
  promoteToMentor,
  suspendUser,
} from "@/api";
import { UsersParams } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllUsers(params: UsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}

export function usePromoteToMentor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promoteToMentor(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => suspendUser(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activeUser(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
export function useBlockUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blockUser(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
