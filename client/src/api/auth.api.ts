import apiClient from "@/lib/apiClient";
import { TLoginPayload } from "@/types/auth.types";

export function userLogin(payload: TLoginPayload) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/users/me");
}

export function updateMyProfileInfromation(payload: any) {
  return apiClient("/users/me", {
    method: "PATCH",
    body: payload,
  });
}
export function updateMyProfileImage(payload: any) {
  return apiClient("/users/me/image", {
    method: "PATCH",
    body: payload,
  });
}
