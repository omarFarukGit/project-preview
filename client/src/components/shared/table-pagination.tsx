"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function TablePagination({
  page,
  totalPages,
  handlePageChange,
}: TablePaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <Button
          className={"cursor-pointer"}
          variant="outline"
          size="icon"
          disabled={page <= 1}
          aria-label="Previous page"
          onClick={() => handlePageChange(page - 1)}
        >
          <ChevronLeft className="size-4 cursor-pointer" />
        </Button>

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${pages[index - 1]}-${pages[index + 1]}`}
              className="flex size-9 items-center justify-center"
            >
              <MoreHorizontal className="size-4" />
            </span>
          ) : (
            <Button
              className={"cursor-pointer"}
              key={item}
              size="icon"
              variant={page === item ? "default" : "outline"}
              aria-label={`Page ${item}`}
              aria-current={page === item ? "page" : undefined}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </Button>
          ),
        )}

        <Button
          className={"cursor-pointer"}
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          aria-label="Next page"
          onClick={() => handlePageChange(page + 1)}
        >
          <ChevronRight className="size-4 cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}
