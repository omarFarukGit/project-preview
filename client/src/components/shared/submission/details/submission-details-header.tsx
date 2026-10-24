import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Submission } from "@/types/submissions.types";

const statusConfig = {
  PENDING: {
    label: "Pending Review",
    variant: "secondary",
    icon: Clock,
  },
  APPROVED: {
    label: "Approved",
    variant: "default",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    variant: "destructive",
    icon: XCircle,
  },
} as const;

interface SubmissionDetailsHeaderProps {
  status: Submission["status"];
}

export default function SubmissionDetailsHeader({
  status,
}: SubmissionDetailsHeaderProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <Button variant="outline" size="icon" className="mt-1 shrink-0">
          <Link
            href="/dashboard/my-submissions"
            aria-label="Back to submissions"
          >
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">
            Submission Details
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View your project submission and mentor feedback.
          </p>
        </div>
      </div>

      <Badge variant={config.variant} className="w-fit gap-1.5 px-3 py-1">
        <StatusIcon className="size-3.5" />
        {config.label}
      </Badge>
    </div>
  );
}
