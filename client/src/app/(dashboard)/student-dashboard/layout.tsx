import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { type ReactNode } from "react";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["STUDENT"]}>
      {/* biome-ignore lint/a11y/useValidAriaRole: `role` is the dashboard role prop, not an ARIA role. */}
      <DashboardShell role="STUDENT">{children}</DashboardShell>
    </RoleGuard>
  );
}
