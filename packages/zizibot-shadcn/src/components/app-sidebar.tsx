import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@zizibot/shadcn/components/ui/sidebar';
import { useAppSelector } from '@zizibot/store/user/hook';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Productivity',
      url: '#',
      role: 'User',
      items: [
        {
          title: 'Pendekin',
          url: '/util/pendekin'
        }
      ]
    },
    {
      title: 'Chat Management',
      url: '#',
      role: 'User',
      items: [
        {
          title: 'RSS',
          url: '/chat/rss'
        },
        {
          title: 'Notes',
          url: '/chat/notes'
        },
        {
          title: 'Welcome Message',
          url: '/chat/welcome-message'
        }
      ]
    },
    {
      title: 'Mirror',
      url: '#',
      role: 'Sudo',
      items: [
        {
          title: 'Mirror Donation',
          url: '/mirror/donation'
        },
        {
          title: 'Mirror User',
          url: '/mirror/user'
        }
      ]
    },
    {
      title: 'Administrator',
      url: '#',
      role: 'Sudo',
      items: [
        {
          title: 'App Settings',
          url: '/admin/app-settings'
        },
        {
          title: 'Api Keys',
          url: '/admin/api-keys'
        },
        {
          title: 'Sudo',
          url: '/admin/sudo'
        },
        {
          title: 'Application',
          url: '/admin/application'
        }
      ]
    },
    {
      title: 'Profile',
      url: '#',
      role: 'User',
      items: [
        {
          title: 'About Me',
          url: '/me/about'
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const userRoles = useAppSelector(state => state.user.roles);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ZiziBot Console</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain
              .filter(x => userRoles?.includes(x.role))
              .map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={pathName.includes(item.url)}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
