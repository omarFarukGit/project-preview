"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth.types";
import { useGetMe } from "@/hooks/auth.hook";
import AuthLoading from "./auth-loading";
import AccessDenied from "./acces-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router.replace]);

  if (isPending) {
    return <AuthLoading label="Vefifying Account" />;
  }
  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }
  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
