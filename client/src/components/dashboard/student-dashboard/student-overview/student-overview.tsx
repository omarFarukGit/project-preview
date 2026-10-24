"use client";

import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  MessageSquareText,
  XCircle,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

interface StudentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
}

interface RecentSubmission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
}

interface RecentReview {
  id: string;
  projectName: string;
  status: SubmissionStatus;
  updatedAt: string;
  feedbacks: {
    id: string;
    comment: string;
    createdAt: string;
    mentor: {
      id: string;
      name: string;
    };
  }[];
}

export interface StudentOverviewData {
  stats: StudentStats;
  recentSubmissions: RecentSubmission[];
  recentReviews: RecentReview[];
}

interface StudentOverviewProps {
  data: StudentOverviewData;
}

const statusConfig = {
  PENDING: {
    label: "Pending",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  },
  APPROVED: {
    label: "Approved",
    className: "border-green-500/30 bg-green-500/10 text-green-600",
  },
  REJECTED: {
    label: "Rejected",
    className: "border-red-500/30 bg-red-500/10 text-red-600",
  },
};

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StatsCards({ stats }: { stats: StudentStats }) {
  const items = [
    {
      title: "Total Submissions",
      value: stats.total,
      icon: FileText,
      description: "All submitted projects",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
      description: "Waiting for review",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle2,
      description: "Successfully approved",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      description: "Need improvement",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ApprovalRateCard({ stats }: { stats: StudentStats }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Approval Rate</CardTitle>
            <CardDescription>
              Your approved submissions percentage
            </CardDescription>
          </div>

          <TrendingUp className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-3xl font-bold">{stats.approvalRate}%</span>
          <span className="text-sm text-muted-foreground">
            {stats.approved} of {stats.total} approved
          </span>
        </div>

        <Progress value={stats.approvalRate} className="h-2" />
      </CardContent>
    </Card>
  );
}

function RecentSubmissions({
  submissions,
}: {
  submissions: RecentSubmission[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
        <CardDescription>Your latest submitted projects</CardDescription>
      </CardHeader>

      <CardContent>
        {submissions.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No submissions yet.
          </p>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <h3 className="truncate font-medium">
                    {submission.projectName}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Submitted {formatDate(submission.createdAt)}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-1 text-sm">
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Repository
                      <ExternalLink className="size-3" />
                    </a>

                    <a
                      href={submission.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Live Demo
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>

                <div className="shrink-0">
                  <StatusBadge status={submission.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentReviews({ reviews }: { reviews: RecentReview[] }) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="size-5" />
          Recent Reviews
        </CardTitle>

        <CardDescription>Feedback from your mentors</CardDescription>
      </CardHeader>

      <CardContent>
        {reviews.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No reviews available yet.
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <button
                key={review.id}
                type="button"
                onClick={() =>
                  router.push(`/student-dashboard/submissions/${review.id}`)
                }
                className="flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="truncate font-medium">{review.projectName}</h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{review.feedbacks[0]?.mentor.name ?? "Mentor"}</span>

                    <span>·</span>

                    <span>
                      {formatDate(
                        review.feedbacks[0]?.createdAt ?? review.updatedAt,
                      )}
                    </span>
                  </div>

                  <div>
                    <StatusBadge status={review.status} />
                  </div>
                </div>

                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function StudentOverview({ data }: StudentOverviewProps) {
  console.log(data, "datas");
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Overview</h1>
        <p className="text-sm text-muted-foreground">
          Track your submissions, progress, and mentor feedback.
        </p>
      </div>

      <StatsCards stats={data?.stats} />

      <ApprovalRateCard stats={data?.stats} />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentSubmissions submissions={data.recentSubmissions} />
        <RecentReviews reviews={data.recentReviews} />
      </div>
    </section>
  );
}
