'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar';
import { Icons } from './icons';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('hyundai-user-role'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hyundai-intern-connect-auth');
    localStorage.removeItem('hyundai-user-role');
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar collapsible="icon" className="hidden border-r bg-background sm:flex">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Icons.HyundaiLogo className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg text-primary group-data-[collapsible=icon]:hidden">
                Intern Connect
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {userRole === 'hr' && (
                 <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => router.push('/')}
                      isActive={pathname === '/'}
                      tooltip="Dashboard"
                    >
                      <Icons.Home />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => router.push('/submit-referral')}
                  isActive={pathname.startsWith('/submit-referral')}
                  tooltip="Submit Referral"
                >
                  <Icons.FilePlus2 />
                  <span>Submit Referral</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                  onClick={handleLogout}
                  tooltip="Log Out"
                >
                  <Icons.LogOut />
                   <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Avatar>
                      <AvatarImage asChild src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDJDNCIvPgo8cGF0aCBkPSJNOS40MDQyNiAxMC44MzVMOS40MDQyNiAyMS4xNjVIMTIuNDk0N0wxMi40OTQ3IDE2LjYxTDExLjI4OTQgMTYuNjFMMTkuNzA2OCAyMS4xNjVIMjIuNTk1N0wxNC4yNzM2IDEzLjU5NUwxOS43MDY4IDEwLjgzNUgyMi41OTU3TDkuNDA0MjYgMTAuODM1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==">
                       <Icons.User />
                      </AvatarImage>
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                        <Icons.HyundaiLogo className="h-4 w-4 text-primary" />
                        <span>My Account</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <Icons.LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
