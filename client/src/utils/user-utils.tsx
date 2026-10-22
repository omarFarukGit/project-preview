import { UserStatus } from "@/types/user.types";

export function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

export function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase() || "U"
  );
}

export function getStatusVariant(status: UserStatus) {
  switch (status) {
    case "ACTIVE":
      return "default" as const;
    case "BLOCKED":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
}
