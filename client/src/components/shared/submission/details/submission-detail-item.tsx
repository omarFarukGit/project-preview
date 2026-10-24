interface SubmissionDetailItemProps {
  label: string;
  value: string;
}

export default function SubmissionDetailItem({
  label,
  value,
}: SubmissionDetailItemProps) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="break-words text-sm font-medium">{value}</p>
    </div>
  );
}
