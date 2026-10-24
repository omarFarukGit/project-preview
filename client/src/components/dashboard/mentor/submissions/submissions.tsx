"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetAllSubmissions } from "@/hooks/submissions.hook";
import useDebounce from "@/hooks/debounce.hook";
import MentorSubmissionsTable from "./submitssions-table";
import { SubmissionStatus } from "@/types/submissions.types";

export default function MentorSubmissionsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const status = searchParams.get("status") ?? "ALL";

  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const updateUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === "ALL") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // Debounced search
  useEffect(() => {
    const value = debouncedSearch.trim();

    if (value !== searchTerm) {
      updateUrl({
        searchTerm: value,
        page: "1",
      });
    }
  }, [debouncedSearch, searchTerm, updateUrl]);

  const params = {
    page,
    limit,
    ...(searchTerm ? { searchTerm } : {}),
    ...(status !== "ALL"
      ? { status: status as SubmissionStatus }
      : {}),
  };

  const { data, isLoading, isFetching, isError } =
    useGetAllSubmissions(params);

  const submissions = data?.data ?? [];
  const meta =data?.meta

  function handleStatusChange(value: string | null) {
    if (value === null) return;

    updateUrl({
      status: value,
      page: "1",
    });
  }

  function handlePageChange(nextPage: number) {
    updateUrl({
      page: String(nextPage),
      limit: String(limit),
    });
  }

  function handleClearFilters() {
    setSearchInput("");

    updateUrl({
      page: "1",
      limit: String(limit),
      searchTerm: "",
      status: "ALL",
    });
  }

  const hasFilters = Boolean(searchTerm || searchInput) || status !== "ALL";

  return (
    <section className="min-w-0 space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          All Submissions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review student projects, check submission status, and provide feedback.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground sm:left-3 sm:size-4" />

          <Input
            type="search"
            placeholder="Search projects..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="h-9 min-w-0 pl-7 pr-2 text-xs sm:pl-9 sm:text-sm"
          />
        </div>

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-9 w-[105px] shrink-0 cursor-pointer px-2 text-xs sm:w-44 sm:px-3 sm:text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Mobile: icon only */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleClearFilters}
          disabled={!hasFilters}
          aria-label="Clear filters"
          title="Clear filters"
          className="size-9 shrink-0 cursor-pointer sm:hidden"
        >
          <X className="size-4" />
        </Button>

        {/* Desktop: text button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleClearFilters}
          disabled={!hasFilters}
          className="hidden h-9 shrink-0 cursor-pointer sm:inline-flex"
        >
          <X className="mr-2 size-4" />
          Clear Filters
        </Button>
      </div>

      {/* Results information */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {meta
            ? `${meta.total} submission${meta.total === 1 ? "" : "s"} found`
            : "Student submissions"}
        </p>

        {isFetching && (
          <p className="text-xs text-muted-foreground">
            Updating results...
          </p>
        )}
      </div>

      {/* Loading, error, and table */}
      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
          Loading submissions...
        </div>
      ) : isError ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-sm text-destructive">
            Failed to load submissions. Please try again.
          </p>
        </div>
      ) : (
        <MentorSubmissionsTable
          submissions={submissions}
          page={meta?.page ?? page}
          totalPages={meta?.totalPages ?? 1}
          handlePageChange={handlePageChange}
          searchTerm={searchTerm}
        />
      )}
    </section>
  );
}