"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 sm:size-24">
          <ShieldAlert
            className="size-10 text-destructive sm:size-12"
            strokeWidth={1.7}
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Error 403
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Access Denied
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
            You don&apos;t have permission to access this page. Please return to
            your dashboard or go back and try another page.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-row justify-center gap-3 ">
          <Button className="h-11 cursor-pointer rounded-xl px-5">
            <Link href="/" className=" flex justify-center items-center">
              <Home className="mr-2 size-4" />
              Go to Home
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 cursor-pointer rounded-xl px-5"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 size-4" />
            Go Back
          </Button>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-muted-foreground">
          If you believe this is a mistake, please contact the administrator.
        </p>
      </div>
    </main>
  );
}
