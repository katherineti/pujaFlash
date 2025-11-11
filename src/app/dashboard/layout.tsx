
'use client';

import type { ReactNode } from 'react';
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Megaphone,
  Settings,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { AppProvider } from '@/context/app-context';
import { FirebaseClientProvider, useAuth } from '@/firebase';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/analiticas', label: 'Analíticas', icon: BarChart3 },
  { href: '/dashboard/campanas', label: 'Campañas de Anuncios', icon: Megaphone },
  { href: '/dashboard/actividad', label: 'Actividad', icon: History },
  { href: '/dashboard/facturacion', label: 'Facturación', icon: CreditCard },
  { href: '/dashboard/configuracion', label: 'Configuración', icon: Settings },
];

function LogoutButton() {
    const auth = useAuth();
    const handleLogout = async () => {
        await auth.signOut();
        // Redirect will happen via onAuthStateChanged listener or manually
        window.location.href = '/login';
    };

    return (
        <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="w-full justify-start gap-2 px-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>Cerrar Sesión</span>
        </Button>
    );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <FirebaseClientProvider>
      <AppProvider>
        <SidebarProvider>
          <Sidebar side="left" variant="sidebar" collapsible="icon">
            <SidebarHeader className="border-b border-sidebar-border">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-sidebar-primary" />
                <span className="font-headline text-2xl font-semibold text-sidebar-foreground">
                  Pujaflash
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      href={item.href}
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <LogoutButton />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </AppProvider>
    </FirebaseClientProvider>
  );
}
