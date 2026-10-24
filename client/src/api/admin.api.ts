import apiClient from "@/lib/apiClient";
import { AllUsersResponse, UsersParams } from "@/types/user.types";

export function getAllUsers(params: UsersParams): Promise<AllUsersResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.role) {
    searchParams.set("role", params.role);
  }

  return apiClient(`/users?${searchParams.toString()}`);
}

export function promoteToMentor(id: string) {
  return apiClient(`/users/${id}/promote-to-mentor`, {
    method: "PATCH",
  });
}
export function deleteUser(id: string) {
  return apiClient(`/users/${id}`, {
    method: "DELETE",
  });
}
export function suspendUser(id: string) {
  return apiClient(`/users/${id}/suspend`, {
    method: "PATCH",
  });
}
export function activeUser(id: string) {
  return apiClient(`/users/${id}/active`, {
    method: "PATCH",
  });
}
export function blockUser(id: string) {
  return apiClient(`/users/${id}/block`, {
    method: "PATCH",
  });
}
