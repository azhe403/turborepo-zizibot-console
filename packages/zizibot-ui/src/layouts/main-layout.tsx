'use client';

import { AppSidebar } from '@zizibot/shadcn/components/app-sidebar';
import DynamicBreadcrumbs from '@zizibot/shadcn/components/dynamic-breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@zizibot/shadcn/components/ui/avatar';
import { Button } from '@zizibot/shadcn/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@zizibot/shadcn/components/ui/dropdown-menu';
import { Separator } from '@zizibot/shadcn/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@zizibot/shadcn/components/ui/sidebar';
import ReduxProvider from '@zizibot/ui/providers/redux-provider';
import SessionManager from '@zizibot/ui/telegram/session-manager';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { Suspense } from 'react';

export default function MainLayout(
  {
    children
  }: {
    children?: React.ReactNode;
  }) {
  const { setTheme } = useTheme();

  return (
    <ReduxProvider>
      <Suspense>
        <SidebarProvider>
          <SessionManager />
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DynamicBreadcrumbs />
              </div>
              <div className="ml-auto mr-3 flex items-center">
                <div className={'m-2'}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('system')}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className={'m-2'}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 px-4 py-5">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Suspense>
    </ReduxProvider>
  );
}
