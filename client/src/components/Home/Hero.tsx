
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl sm:-right-32 sm:-top-32 sm:size-96" />
        <div className="absolute -bottom-32 -left-24 size-64 rounded-full bg-primary/5 blur-3xl sm:-bottom-40 sm:-left-32 sm:size-96" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] sm:bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        {/* Hero content */}
        <div className="mx-auto w-full min-w-0 max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-5 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary sm:mb-7 sm:px-4 sm:text-sm">
            <Sparkles className="size-3.5 shrink-0 sm:size-4" />
            <span>A Better Way to Showcase Your Work</span>
          </div>

          <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Build Projects.
            <span className="mt-1 block text-primary sm:mt-2">
              Get Feedback.
            </span>
            Grow Your Skills.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-base sm:leading-7 md:text-lg lg:mx-0">
            Submit your projects, receive meaningful feedback from mentors, and
            track your progress — all in one place.
          </p>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row lg:justify-start">
            <Button
              nativeButton={false}
              size="lg"
              className="h-11 w-full rounded-xl px-5 font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:h-12 sm:w-auto sm:px-6"
              render={<Link href="/register" />}
            >
              Get Started
              <ArrowRight className="ml-1 size-4" />
            </Button>

            <Button
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-11 w-full rounded-xl border-border bg-background/70 px-4 sm:h-12 sm:w-auto sm:px-6"
              render={<Link href="/how-it-works" />}
            >
              <Code2 className="mr-1 size-4 shrink-0" />
              Explore How It Works
            </Button>
          </div>

          {/* Benefits */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs text-muted-foreground sm:mt-8 sm:gap-x-5 sm:text-sm lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary" />
              Easy submissions
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-primary" />
              Mentor feedback
            </span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto w-full min-w-0 max-w-xl lg:ml-auto">
          <div className="absolute -inset-3 rounded-[1.5rem] bg-primary/10 blur-2xl sm:-inset-5 sm:rounded-[2rem]" />

          <div className="relative min-w-0 rounded-2xl border border-border/80 bg-card p-3 shadow-2xl shadow-slate-950/5 sm:p-5 md:p-6">
            {/* Preview header */}
            <div className="flex min-w-0 items-center justify-between gap-3 border-b border-border pb-4 sm:pb-5">
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground sm:text-xs">
                  STUDENT WORKSPACE
                </p>

                <h2 className="mt-1 text-base font-semibold text-card-foreground sm:text-lg">
                  My Submissions
                </h2>
              </div>

              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
                <FileCheck2 className="size-4 sm:size-5" />
              </div>
            </div>

            {/* Summary cards */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
              {[
                { label: "Total", value: "03" },
                { label: "Pending", value: "01" },
                { label: "Approved", value: "02" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-lg border border-border/70 bg-background p-2.5 sm:rounded-xl sm:p-4"
                >
                  <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:mt-2 sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Approved project */}
            <div className="mt-4 min-w-0 rounded-xl border border-border/70 p-3 sm:mt-5 sm:p-4">
              <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-11 sm:rounded-xl">
                  <Code2 className="size-4 sm:size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-card-foreground sm:text-base">
                    E-commerce Web Application
                  </h3>

                  <p className="mt-1 break-words text-[11px] text-muted-foreground sm:text-sm">
                    React · TypeScript · Node.js
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary sm:gap-1.5 sm:px-2.5 sm:text-xs">
                  <CheckCircle2 className="size-3 sm:size-3.5" />
                  Approved
                </span>
              </div>

              <div className="mt-3 border-t border-border pt-3 sm:mt-4">
                <p className="text-[11px] leading-5 text-muted-foreground sm:text-xs">
                  Mentor feedback
                </p>

                <p className="mt-1 text-xs leading-5 text-card-foreground sm:text-sm sm:leading-6">
                  Great structure and a clear user experience. Keep improving
                  your project documentation.
                </p>
              </div>
            </div>

            {/* Pending project */}
            <div className="mt-3 flex min-w-0 items-center gap-2.5 rounded-xl border border-border/70 bg-background p-3 sm:gap-3 sm:p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 sm:size-10 sm:rounded-xl">
                <Clock3 className="size-4 sm:size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                  Task Management App
                </p>

                <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                  Submitted for review
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-700 dark:text-amber-300 sm:px-2.5 sm:text-xs">
                Pending
              </span>
            </div>

            <p className="mt-3 text-center text-[10px] text-muted-foreground sm:mt-4 sm:text-xs">
              Your projects. Your progress. One workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
