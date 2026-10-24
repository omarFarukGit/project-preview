import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  FileQuestion,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-background px-4 py-16 sm:px-6">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-10 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto flex size-28 items-center justify-center rounded-3xl border border-border bg-card shadow-sm sm:size-32">
          <div className="absolute inset-3 rounded-2xl bg-primary/5" />

          <FileQuestion className="relative size-14 text-primary sm:size-16" />

          <span className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm">
            <Compass className="size-5" />
          </span>
        </div>

        {/* Error code */}
        <p className="mt-8 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Oops! Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          The page you are looking for may have been moved, deleted, or never
          existed. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            size="lg"
            className="group rounded-xl cursor-pointer"
            render={<Link href="/" />}
          >
            <Home className="mr-2 size-4" />
            Back to Home
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-xl cursor-pointer"
            render={<Link href="/" />}
          >
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </div>

        {/* Brand */}
        <p className="mt-10 text-sm text-muted-foreground">
          Lost your way?{" "}
          <Link
            href="/"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Explore ProjectReview
          </Link>
        </p>
      </div>
    </main>
  );
}
