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
      items: [
        {
          title: 'Pendekin',
          url: '/pendekin'
        }
      ]
    },
    {
      title: 'Getting Started',
      url: '#',
      items: [
        {
          title: 'Installation',
          url: '#'
        },
        {
          title: 'Project Structure',
          url: '#'
        }
      ]
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        {
          title: 'Routing',
          url: '#'
        },
        {
          title: 'Data Fetching',
          url: '#',
          isActive: true
        },
        {
          title: 'Rendering',
          url: '#'
        },
        {
          title: 'Caching',
          url: '#'
        },
        {
          title: 'Styling',
          url: '#'
        },
        {
          title: 'Optimizing',
          url: '#'
        },
        {
          title: 'Configuring',
          url: '#'
        },
        {
          title: 'Testing',
          url: '#'
        },
        {
          title: 'Authentication',
          url: '#'
        },
        {
          title: 'Deploying',
          url: '#'
        },
        {
          title: 'Upgrading',
          url: '#'
        },
        {
          title: 'Examples',
          url: '#'
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
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
            {data.navMain.map((item) => (
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
