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

import useDebounce from "@/hooks/debounce.hook";
import { useGetAllUsers } from "@/hooks/admin.hook";
import UsersTable from "./users-table";

import type { UserRole, UsersParams } from "@/types/user.types";

type RoleFilter = "ALL" | UserRole;

export default function AllUsers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);
  const search = searchParams.get("search") ?? "";
  const role = (searchParams.get("role") ?? "ALL") as RoleFilter;

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

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

  // Debounced server-side search
  useEffect(() => {
    const value = debouncedSearch.trim();

    if (value !== search) {
      updateUrl({
        search: value,
        page: "1",
      });
    }
  }, [debouncedSearch, search, updateUrl]);

  const params: UsersParams = {
    page,
    limit,
    ...(search ? { search } : {}),
    ...(role !== "ALL" ? { role } : {}),
  };

  const { data, isLoading, isFetching, isError } = useGetAllUsers(params);

  const users = data?.data ?? [];
  const meta = data?.meta;

  function handleRoleChange(value: RoleFilter | null) {
    const nextRole = value ?? "ALL";

    updateUrl({
      role: nextRole,
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
      role: "ALL",
    });
  }

  const hasFilters = Boolean(search) || role !== "ALL";

  return (
    <section className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Users</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Search users, filter by role and promote students to mentors.
        </p>
      </div>

      {/* Search and role filter */}
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground sm:left-3 sm:size-4" />

          <Input
            type="search"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="h-9 min-w-0 px-2 pl-7 text-xs sm:px-3 sm:pl-9 sm:text-sm"
          />
        </div>

        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="h-9 w-[105px] shrink-0 px-2 text-xs sm:w-44 sm:px-3 sm:text-sm">
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MENTOR">Mentor</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleClearFilters}
          disabled={!hasFilters && !searchInput}
          aria-label="Clear filters"
          title="Clear filters"
          className="size-9 shrink-0 sm:hidden"
        >
          <X className="size-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleClearFilters}
          disabled={!hasFilters && !searchInput}
          className="hidden h-10 shrink-0 sm:inline-flex"
        >
          <X className="mr-2 size-4" />
          Clear Filters
        </Button>
      </div>

      {/* Results info */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {meta
            ? `${meta.total} user${meta.total === 1 ? "" : "s"} found`
            : "Users"}
        </p>

        {isFetching && !isLoading && (
          <p className="text-xs text-muted-foreground">Updating results...</p>
        )}
      </div>

      {/* Loading, error and table */}
      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
          Loading users...
        </div>
      ) : isError ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-sm text-destructive">Failed to load users.</p>
        </div>
      ) : (
        <UsersTable
          users={users}
          page={meta?.page ?? page}
          totalPages={meta?.totalPages ?? 1}
          total={meta?.total ?? users.length}
          handlePageChange={handlePageChange}
          search={search}
        />
      )}
    </section>
  );
}
