"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-foreground px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Start Your Journey
          </div>

          <div className="mt-4 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Rocket className="size-6" />
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-background sm:text-3xl lg:text-4xl">
            Your Next Project{" "}
            <span className="text-primary">Deserves to Be Seen.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-background/70 sm:text-base">
            Share what you build, get meaningful feedback, and take the next
            step in your development journey with ProjectReview.
          </p>

          <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              nativeButton={false}
              className="group h-10 rounded-lg px-5"
              render={<Link href="/register" />}
            >
              Get Started Free
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              nativeButton={false}
              className="h-10 rounded-lg border-background/20 bg-background/5 px-5 text-background hover:bg-background/10 hover:text-background"
              render={<Link href="/login" />}
            >
              Sign In
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-background/70 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              Showcase your work
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              Learn from feedback
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
