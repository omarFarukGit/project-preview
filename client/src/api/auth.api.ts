import apiClient from "@/lib/apiClient";
import { TLoginPayload } from "@/types/auth.types";

export function userLogin(payload: TLoginPayload) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}
