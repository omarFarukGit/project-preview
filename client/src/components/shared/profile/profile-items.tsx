import { ProfileItemProps } from "@/types/user.types";

export default function ProfileItem({
  icon: Icon,
  label,
  value,
}: ProfileItemProps) {
  const isUrl = value !== "Not provided" && /^https?:\/\//i.test(value);

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        {isUrl ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block break-all text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 whitespace-pre-wrap break-words text-sm font-medium text-foreground">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
