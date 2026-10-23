"use client";

import Link from "next/link";
import { ExternalLink, Eye, Globe } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/shared/table-pagination";
import type { Submission } from "@/types/submissions.types";
import { FaGithub } from "react-icons/fa";

interface SubmissionsTableProps {
  submissions: Submission[];
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  searchTerm: string;
}

function SubmissionStatusBadge({ status }: { status: Submission["status"] }) {
  const variant = {
    PENDING: "secondary",
    APPROVED: "default",
    REJECTED: "destructive",
  } as const;

  return (
    <Badge
      variant={variant[status]}
      className="whitespace-nowrap text-[9px] sm:text-xs"
    >
      {status}
    </Badge>
  );
}

export default function SubmissionsTable({
  submissions,
  page,
  totalPages,
  handlePageChange,
  searchTerm,
}: SubmissionsTableProps) {
  return (
    <div className="w-full min-w-0 space-y-4">
      <div className="w-full min-w-0 rounded-lg border">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[34%] px-2 text-xs sm:w-[27%] sm:px-4 sm:text-sm">
                Project
              </TableHead>

              <TableHead className="w-[20%] px-1 text-xs sm:w-[15%] sm:px-4 sm:text-sm">
                Status
              </TableHead>

              <TableHead className="w-[16%] px-1 text-center text-xs sm:w-[22%] sm:px-4 sm:text-left sm:text-sm">
                <span className="sm:hidden">Repo</span>
                <span className="hidden sm:inline">Repository</span>
              </TableHead>

              <TableHead className="w-[18%] px-1 text-xs sm:w-[20%] sm:px-4 sm:text-sm">
                <span className="sm:hidden">Date</span>
                <span className="hidden sm:inline">Submitted At</span>
              </TableHead>

              <TableHead className="w-[12%] px-1 text-center text-xs sm:w-[16%] sm:px-4 sm:text-right sm:text-sm">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 whitespace-normal break-words px-2 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm"
                >
                  {searchTerm
                    ? `No submissions found for "${searchTerm}".`
                    : "No submissions found."}
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  {/* Project */}
                  <TableCell className="overflow-hidden whitespace-normal break-words px-2 py-3 text-xs font-medium sm:px-4 sm:text-sm">
                    <p>{submission.projectName}</p>

                    {submission.liveUrl && (
                      <a
                        href={submission.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open live demo"
                        title="Live demo"
                        className="mt-1 inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
                      >
                        <Globe className="size-3 shrink-0" />
                        <span className="hidden sm:inline">Live Demo</span>
                        <ExternalLink className="hidden size-3 shrink-0 sm:inline" />
                      </a>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-1 py-3 sm:px-4">
                    <SubmissionStatusBadge status={submission.status} />
                  </TableCell>

                  {/* Repository */}
                  <TableCell className="px-1 py-3 text-center sm:px-4 sm:text-left">
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open GitHub repository"
                      title="GitHub repository"
                      className="inline-flex items-center justify-center gap-2 rounded-md p-1.5 hover:bg-accent hover:text-primary sm:justify-start sm:p-0"
                    >
                      <FaGithub className="size-4 shrink-0 sm:size-4" />
                      <span className="hidden sm:inline">Repository</span>
                      <ExternalLink className="hidden size-3 shrink-0 sm:inline" />
                    </a>
                  </TableCell>

                  {/* Submitted Date */}
                  <TableCell className="break-words px-1 py-3 text-[10px] sm:whitespace-nowrap sm:px-4 sm:text-sm">
                    {new Date(submission.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-1 py-3 text-center sm:px-4 sm:text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="size-8 p-0 sm:h-8 sm:w-auto sm:gap-2 sm:px-3"
                    >
                      <Link
                        className=" flex justify-center items-center gap-1"
                        href={`/dashboard/submissions/${submission.id}`}
                        aria-label="View submission"
                        title="View submission"
                      >
                        <Eye className="size-4 shrink-0" />
                        <span className="hidden sm:inline">View</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex w-full min-w-0 justify-center sm:justify-end">
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
