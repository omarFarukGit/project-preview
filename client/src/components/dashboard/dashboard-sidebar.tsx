"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { adminRoutes } from "@/routes/admin.routes";
import { studentRoutes } from "@/routes/student.routes";
import { mentorRoutes } from "@/routes/mentor.routes";
import { UserRole } from "@/types/auth.types";

const sidebarRoutes: Record<
  UserRole,
  typeof adminRoutes | typeof studentRoutes | typeof mentorRoutes
> = {
  ADMIN: adminRoutes,
  MENTOR: mentorRoutes,
  STUDENT: studentRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes = sidebarRoutes[role];

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo */}
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
              className="size-8 rounded-xl object-contain"
            />
          </span>

          <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Project<span className="text-primary">Review</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/" && pathname.startsWith(`${item.url}/`));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className="cursor-pointer hover:bg-primary/5 hover:text-foreground data-[active=true]:bg-primary/15 data-[active=true]:text-primary mt-1"
                      >
                        <Link
                          href={item.url}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}