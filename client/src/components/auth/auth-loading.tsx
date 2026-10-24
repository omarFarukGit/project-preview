import { LoaderIcon } from "lucide-react";
export default function AuthLoading({
  label = "Vefifying Account",
}: {
  label?: string;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div>
          <LoaderIcon className="size-6 animate-spin text-primary" />
        </div>
      </div>
    </div>
  );
}
