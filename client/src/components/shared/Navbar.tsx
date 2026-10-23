"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";

import { ModeToggle } from "./ModeToggle";
import { useGetMe, useLogout } from "@/hooks/auth.hook";

const navItems = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

const roleDashboards: Record<string, string> = {
  STUDENT: "/student-dashboard",
  MENTOR: "/mentor-dashboard",
  ADMIN: "/admin-dashboard",
};

export function Navbar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userResponse, isLoading } = useGetMe();
  const { mutateAsync: logout, isPending } = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = userResponse?.data;
  const dashboard = user?.role
    ? (roleDashboards[user.role] ?? "/login")
    : "/login";

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
      setMobileOpen(false);

      toast.add({
        title: "Logged out successfully",
        type: "success",
      });

      router.replace("/login");
      router.refresh();
    } catch {
      toast.add({
        title: "Logout failed",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const renderAuthActions = (mobile = false) => {
    if (isLoading) {
      return <Skeleton className="h-9 w-24 rounded-lg" />;
    }

    if (!user) {
      return (
        <div className={mobile ? "grid gap-2" : "flex items-center gap-2"}>
          <Button
            variant="ghost"
            onClick={() => {
              setMobileOpen(false);
              router.push("/login");
            }}
            className="font-medium cursor-pointer"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setMobileOpen(false);
              router.push("/register");
            }}
            className="bg-primary font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
          >
            Get Started <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className={mobile ? "grid gap-2" : "flex items-center gap-2"}>
        <Button
          variant="outline"
          onClick={() => {
            setMobileOpen(false);
            router.push(dashboard);
          }}
          className="gap-2 border-border/70 cursor-pointer"
        >
          <LayoutDashboard className="size-4 cursor-pointer" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={handleLogout}
          className="justify-start gap-2 text-muted-foreground hover:text-destructive cursor-pointer"
        >
          <LogOut className="size-4 cursor-pointer" />
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
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

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 md:flex cursor-pointer">
            {renderAuthActions()}
          </div>

          <ModeToggle />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-border bg-background sm:w-[350px]"
            >
              <div className="flex h-full flex-col px-2 pt-8">
                <div className="mb-6 flex items-center gap-2.5 border-b border-border pb-5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <LayoutDashboard className="size-5 text-primary" />
                  </span>
                  <div>
                    <p className="font-bold">
                      Project<span className="text-primary">Review</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submit. Review. Improve.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="my-5 border-t border-border" />

                <div className="mt-auto space-y-3 pb-5">
                  {renderAuthActions(true)}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
