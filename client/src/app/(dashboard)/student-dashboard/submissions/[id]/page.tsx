"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useGetSubmissionById } from "@/hooks/submissions.hook";

import SubmissionDetailsHeader from "@/components/shared/submission/details/submission-details-header";
import SubmissionPeopleCards from "@/components/shared/submission/details/submission-people-cards";
import SubmissionFeedbackCard from "@/components/shared/submission/details/submission-feedback-card";
import { SubmissionDetails } from "@/types/submissions.types";
import SubmissionProjectCard from "@/components/shared/submission/details/submission-project-card";

interface SubmissionDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SubmissionDetails;
}

export default function SubmissionDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetSubmissionById(params.id);

  // Adjust this extraction if your apiClient returns another shape.
  const response = data as
    | SubmissionDetailsResponse
    | { data: SubmissionDetailsResponse }
    | undefined;

  const submission: SubmissionDetails | undefined = response
    ? "success" in response
      ? response.data
      : response.data.data
    : undefined;

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading submission details...
        </p>
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 py-10 text-center">
        <FileText className="mx-auto size-10 text-muted-foreground" />

        <h1 className="text-xl font-semibold">Submission not found</h1>

        <p className="text-sm text-muted-foreground">
          Unable to load this submission. Please try again.
        </p>

        <Button variant="outline">
          <Link href="/dashboard/my-submissions">
            <ArrowLeft className="mr-2 size-4" />
            Back to My Submissions
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-5xl space-y-6 p-4">
      <SubmissionDetailsHeader status={submission.status} />

      <SubmissionProjectCard submission={submission} />

      <SubmissionPeopleCards submission={submission} />
      <SubmissionFeedbackCard feedbacks={submission.feedbacks ?? []} />
    </section>
  );
}
