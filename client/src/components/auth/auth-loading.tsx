
import { LoaderCircle, ShieldCheck } from "lucide-react";

export default function AuthLoading({
  label = "Verifying Account",
}: {
  label?: string;
}) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 size-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
        {/* Icon */}
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
          <ShieldCheck className="size-8 text-primary" strokeWidth={1.7} />
        </div>

        {/* Loader */}
        <div className="mb-4 flex items-center justify-center">
          <LoaderCircle className="size-7 animate-spin text-primary" />
        </div>

        {/* Content */}
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          {label}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Please wait while we securely verify your account.
        </p>

        {/* Loading Indicator */}
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
}
