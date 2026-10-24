"use client";

import MyReviewedTable from "@/components/dashboard/mentor/submissions/my-reviewed-table";
import { useGetMyReviewed } from "@/hooks/submissions.hook";

export default function MyReviewedPage() {
  const { data, isPending, isError } = useGetMyReviewed();

  if (isPending) {
    return <p className="p-6">Loading reviewed submissions...</p>;
  }

  if (isError || !data?.data) {
    return (
      <p className="p-6 text-destructive">
        Failed to load reviewed submissions.
      </p>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <MyReviewedTable data={data.data} />
    </div>
  );
}
