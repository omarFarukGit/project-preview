import { ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import SubmissionDetailItem from "./submission-detail-item";
import { FaGithub } from "react-icons/fa";
import { SubmissionProjectCardProps } from "@/types/submissions.types";

export function formatSubmissionDate(date?: string) {
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

export default function SubmissionProjectCard({
  submission,
}: SubmissionProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-words text-xl">
          {submission.projectName}
        </CardTitle>
        <CardDescription>
          Project overview and submission information
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex gap-3">
          {submission.repoUrl && (
            <Button
              className={
                "cursor-pointer flex justify-center items-center gap-1 "
              }
              variant="outline"
            >
              <a
                className={
                  "cursor-pointer flex justify-center items-center gap-1 "
                }
                href={submission.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 size-4" />
                GitHub Repository
                <ExternalLink className="ml-2 size-3.5" />
              </a>
            </Button>
          )}

          {submission.liveUrl && (
            <Button
              className={
                "cursor-pointer flex justify-center items-center gap-1"
              }
            >
              <a
                className={
                  "cursor-pointer flex justify-center items-center gap-1 "
                }
                href={submission.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <ExternalLink className="ml-2 size-3.5" />
              </a>
            </Button>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Project Description</h2>
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
            {submission.description || "No description provided."}
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SubmissionDetailItem label="Submission ID" value={submission.id} />
          <SubmissionDetailItem
            label="Submitted At"
            value={formatSubmissionDate(submission.createdAt)}
          />
          <SubmissionDetailItem
            label="Last Updated"
            value={formatSubmissionDate(submission.updatedAt)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
