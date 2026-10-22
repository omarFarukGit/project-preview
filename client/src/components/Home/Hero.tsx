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
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        {/* Hero content */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            A Better Way to Showcase Your Work
          </div>

          <h1 className="text-4xl leading-[1.12] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build Projects.
            <span className="mt-2 block text-primary">
              Get Feedback.
            </span>
            Grow Your Skills.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
            Submit your projects, receive meaningful feedback from
            mentors, and track your progress — all in one place.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="h-12 rounded-xl px-6 font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              render={<Link href="/register" />}
            >
              Get Started
              <ArrowRight className="ml-1 size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-border bg-background/70 px-6"
              render={<Link href="/how-it-works" />}
            >
              <Code2 className="mr-1 size-4" />
              Explore How It Works
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              Easy submissions
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              Mentor feedback
            </span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" />

          <div className="relative rounded-2xl border border-border/80 bg-card p-4 shadow-2xl shadow-slate-950/5 sm:p-6">
            {/* Preview header */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  STUDENT WORKSPACE
                </p>
                <h2 className="mt-1 text-lg font-semibold text-card-foreground">
                  My Submissions
                </h2>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileCheck2 className="size-5" />
              </div>
            </div>

            {/* Summary cards */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Total", value: "03" },
                { label: "Pending", value: "01" },
                { label: "Approved", value: "02" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/70 bg-background p-3 sm:p-4"
                >
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Example project */}
            <div className="mt-5 rounded-xl border border-border/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-card-foreground">
                    E-commerce Web Application
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    React · TypeScript · Node.js
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5" />
                  Approved
                </span>
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <p className="text-xs leading-5 text-muted-foreground">
                  Mentor feedback
                </p>
                <p className="mt-1 text-sm leading-6 text-card-foreground">
                  Great structure and a clear user experience. Keep
                  improving your project documentation.
                </p>
              </div>
            </div>

            {/* Pending project */}
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/70 bg-background p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Clock3 className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  Task Management App
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Submitted for review
                </p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                Pending
              </span>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Your projects. Your progress. One workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
