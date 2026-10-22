import * as React from "react";

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
import Link from "next/link";
import Image from "next/image";
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
  const routes = sidebarRoutes[role];
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo */}
        <Link href="/" className="shrink-0 rounded-full dark:bg-white">
          <Image
            src="/images/fix-flow-logo-main.png"
            alt="FixFlow logo"
            priority
            className="object-cover"
            width={80}
            height={80}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
