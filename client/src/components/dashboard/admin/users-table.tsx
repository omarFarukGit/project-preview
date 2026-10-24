"use client";

import Link from "next/link";
import {
  Eye,
  CalendarDays,
  Mail,
  ShieldCheck,
  Trash2,
  Ban,
  ShieldAlert,
  CheckCircle,
} from "lucide-react";

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

import type { User } from "@/types/user.types";
import PromoteMentorDialog from "./actions/promote-mentor-dialog";
import DeleteUserDialog from "./actions/delete-user-dialog";
import BlockUserDialog from "./actions/block-user-dialog";
import SuspendUserDialog from "./actions/suspend-user-dialog";
import ActivateUserDialog from "./actions/activate-user-dialog";

interface UsersTableProps {
  users: User[];
  page: number;
  totalPages: number;
  total: number;
  handlePageChange: (page: number) => void;
  search: string;
}

function UserRoleBadge({ role }: { role: User["role"] }) {
  const variants = {
    ADMIN: "destructive",
    MENTOR: "default",
    STUDENT: "secondary",
  } as const;

  return <Badge variant={variants[role]}>{role}</Badge>;
}

function UserStatusBadge({ status }: { status: User["status"] }) {
  return (
    <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
      {status}
    </Badge>
  );
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UsersTable({
  users,
  page,
  totalPages,
  total,
  handlePageChange,
  search,
}: UsersTableProps) {
  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-lg border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  {search
                    ? `No users found for "${search}".`
                    : "No users found."}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="max-w-[180px] truncate font-medium">
                    {user.name}
                  </TableCell>

                  <TableCell className="max-w-[220px] truncate">
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>

                  <TableCell>
                    <UserStatusBadge status={user.status} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {formatDate(user.createdAt)}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {user.role === "STUDENT" && (
                        <PromoteMentorDialog
                          userId={user.id}
                          userName={user.name}
                        />
                      )}

                      <ActivateUserDialog
                        userId={user.id}
                        userName={user.name}
                        disabled={user.status === "ACTIVE"}
                      />

                      <SuspendUserDialog
                        userId={user.id}
                        userName={user.name}
                        disabled={user.status === "SUSPEND"}
                      />

                      <BlockUserDialog
                        userId={user.id}
                        userName={user.name}
                        disabled={user.status === "BLOCKED"}
                      />

                      <DeleteUserDialog userId={user.id} userName={user.name} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {users.length === 0 ? (
          <div className="rounded-lg border py-12 text-center text-sm text-muted-foreground">
            {search ? `No users found for "${search}".` : "No users found."}
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="min-w-0 space-y-4 rounded-xl border bg-card p-4"
            >
              {/* User information */}
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <ShieldCheck className="size-5 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold leading-tight">
                    {user.name}
                  </h3>

                  <div className="mt-1 flex min-w-0 items-start gap-2 text-sm text-muted-foreground">
                    <Mail className="mt-0.5 size-4 shrink-0" />
                    <span className="break-all">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Role and status */}
              <div className="flex flex-wrap items-center gap-2">
                <UserRoleBadge role={user.role} />
                <UserStatusBadge status={user.status} />
              </div>

              {/* Joined date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 shrink-0" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2">
                {user.role === "STUDENT" && (
                  <PromoteMentorDialog userId={user.id} userName={user.name} />
                )}

                {/* Active */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                  aria-label={`Activate ${user.name}`}
                  title="Activate user"
                >
                  <CheckCircle className="size-4" />
                </Button>

                {/* Suspend */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                  aria-label={`Suspend ${user.name}`}
                  title="Suspend user"
                >
                  <ShieldAlert className="size-4" />
                </Button>

                {/* Block */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                  aria-label={`Block ${user.name}`}
                  title="Block user"
                >
                  <Ban className="size-4" />
                </Button>

                {/* Delete */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="size-8"
                  aria-label={`Delete ${user.name}`}
                  title="Delete user"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer and Pagination */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "user" : "users"} found
        </p>

        <div className="flex min-w-0 justify-center sm:justify-end">
          <TablePagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
