"use client";

import Link from "next/link";
import { ArrowRight, Mail, MoveUpRight } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
  ],
  Account: [
    { label: "Login", href: "/login" },
    { label: "Create Account", href: "/register" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5"
              aria-label="ProjectReview home"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Image
                  src="/images/project-review-logo-icon.png"
                  alt=""
                  width={500}
                  height={500}
                  className="size-8 object-contain rounded-xl"
                />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Project<span className="text-primary">Review</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              A simple platform for students to submit projects, mentors to
              review their work, and everyone to keep improving.
            </p>

            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Submit. Review. Improve.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.Platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Get Started
            </h3>
            <ul className="space-y-3">
              {footerLinks.Account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <MoveUpRight className="size-3.5 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Join ProjectReview
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground" suppressHydrationWarning>
            {/* © {new Date().getFullYear()} ProjectReview. All rights reserved. */}
            © 2026 ProjectReview. All rights reserved.
          </p>

          <p className="text-muted-foreground">
            Built for learning and growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
