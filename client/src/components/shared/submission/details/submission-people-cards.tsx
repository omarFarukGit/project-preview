import { CheckCircle2, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SubmissionDetailItem from "./submission-detail-item";
import { SubmissionDetails } from "@/types/submissions.types";

interface SubmissionPeopleCardsProps {
  submission: SubmissionDetails;
}

export default function SubmissionPeopleCards({
  submission,
}: SubmissionPeopleCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserRound className="size-4" />
            Student Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <SubmissionDetailItem
            label="Student Name"
            value={submission.student?.name || "Not available"}
          />
          <SubmissionDetailItem
            label="Email Address"
            value={submission.student?.email || "Not available"}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="size-4" />
            Review Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <SubmissionDetailItem
            label="Reviewed By"
            value={submission.reviewedBy?.name || "Not reviewed yet"}
          />
          <SubmissionDetailItem
            label="Review Status"
            value={submission.status}
          />
          <SubmissionDetailItem
            label="Review Updated At"
            value={formatDate(submission.updatedAt)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function formatDate(date?: string) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return parsed.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
