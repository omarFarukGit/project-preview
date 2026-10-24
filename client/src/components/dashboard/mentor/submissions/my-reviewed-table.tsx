"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaGithub } from "react-icons/fa";

type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

interface ReviewedSubmission {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  submission: {
    id: string;
    projectName: string;
    repoUrl: string;
    liveUrl: string;
    description: string;
    status: SubmissionStatus;
    createdAt: string;
    updatedAt: string;
    student: {
      id: string;
      name: string;
      email: string;
    };
  };
}

interface MyReviewedTableProps {
  data: {
    totalReviewed: number;
    reviews: ReviewedSubmission[];
  };
}

const statusStyles: Record<SubmissionStatus, string> = {
  APPROVED: "border-green-500/30 bg-green-500/10 text-green-600",
  PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  REJECTED: "border-red-500/30 bg-red-500/10 text-red-600",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function MyReviewedTable({ data }: MyReviewedTableProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reviewed Submissions</CardTitle>
        <CardDescription>Total reviews: {data.totalReviewed}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviewed At</TableHead>
                <TableHead>Links</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.reviews.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    You haven't reviewed any submissions yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.reviews.map((review) => {
                  const submission = review.submission;

                  return (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="max-w-52">
                          <p className="truncate font-medium">
                            {submission.projectName}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                            {submission.description}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="min-w-36">
                          <p className="font-medium">
                            {submission.student.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {submission.student.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusStyles[submission.status]}
                        >
                          {submission.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {formatDate(review.createdAt)}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <a
                            href={submission.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open repository"
                            title="Repository"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <FaGithub className="size-4" />
                          </a>

                          <a
                            href={submission.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open live project"
                            title="Live project"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className={"cursor-pointer"}
                          onClick={() =>
                            router.push(
                              `/mentor-dashboard/submissions/${submission.id}`,
                            )
                          }
                        >
                          <Eye className="mr-2 size-4" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
