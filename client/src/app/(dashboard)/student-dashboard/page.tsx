"use client";

import StudentOverview from "@/components/dashboard/student-dashboard/student-overview/student-overview";
import { useGetStudentOverview } from "@/hooks/overview.hook";

export default function StudentDashboardPage() {
  const { data, isPending, isError } = useGetStudentOverview();

  if (isPending) {
    return (
      <p className="p-6 text-sm text-muted-foreground">Loading overview...</p>
    );
  }

  if (isError || !data?.data) {
    return (
      <p className="p-6 text-sm text-destructive">
        Failed to load student overview.
      </p>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <StudentOverview data={data.data} />
    </div>
  );
}
