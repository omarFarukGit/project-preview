import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { UserRole } from "@/types/auth.types";
import Logout from "../shared/Logout";
import { ModeToggle } from "../shared/ModeToggle";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className=" flex z-50 sticky top-0 h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-white  dark:bg-background/70 backdrop-blur-xl">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <div className=" flex justify-center items-center gap-4">
            <ModeToggle/>
            <Logout />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
