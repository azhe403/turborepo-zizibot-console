import { AppSidebar } from '@zizibot/shadcn/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@zizibot/shadcn/components/ui/breadcrumb';
import { Separator } from '@zizibot/shadcn/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@zizibot/shadcn/components/ui/sidebar';
import { UserCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@zizibot/shadcn/components/ui/popover';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute right-3 flex items-center gap-3 2xsm:gap-7">
            <Popover>
              <PopoverTrigger>
                <UserCircle className="h-6 w-6" />
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}