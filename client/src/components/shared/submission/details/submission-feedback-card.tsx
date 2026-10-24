import { CalendarDays, MessageSquare } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatSubmissionDate } from "./submission-project-card";
import { SubmissionDetails } from "@/types/submissions.types";

interface SubmissionFeedbackCardProps {
  feedbacks: NonNullable<SubmissionDetails["feedbacks"]>;
}

export default function SubmissionFeedbackCard({
  feedbacks,
}: SubmissionFeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="size-5" />
          Mentor Feedback
        </CardTitle>
        <CardDescription>
          Comments and feedback from your mentor
        </CardDescription>
      </CardHeader>

      <CardContent>
        {feedbacks.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <MessageSquare className="mx-auto mb-3 size-8 text-muted-foreground" />
            <p className="text-sm font-medium">No feedback yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your mentor feedback will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="space-y-3 rounded-lg border p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold">
                    {feedback.mentor?.name || "Mentor"}
                  </p>

                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatSubmissionDate(feedback.createdAt)}
                  </p>
                </div>

                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                  {feedback.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
