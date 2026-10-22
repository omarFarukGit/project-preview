import { getMe, updateMyProfileImage, updateMyProfileInfromation, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useUpdateMyProfileInformation() {
  return useMutation({
    mutationFn: updateMyProfileInfromation,
  });
}

export function useUpdateMyProfileImage() {
  return useMutation({
    mutationFn: updateMyProfileImage,
  });
}
