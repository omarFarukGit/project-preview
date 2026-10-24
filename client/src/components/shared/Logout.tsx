"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { LogOut } from "lucide-react";
import { useGetMe, useLogout } from "@/hooks/auth.hook";

export default function Logout() {
  const router = useRouter();
  const { data: user, isLoading } = useGetMe();
  const { mutateAsync: logout, isPending: logoutPending } = useLogout();

  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await logout();

      queryClient.clear();

      toast.add({
        description: "Logged out successfully!",
        type: "success",
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      toast.add({
        description: "Failed to log out. Please try again.",
        type: "error",
      });
    }
  };
  return (
    <button type="button" onClick={handleLogout}>
      <LogOut className=" text-red-600 size-4 cursor-pointer" />
    </button>
  );
}
