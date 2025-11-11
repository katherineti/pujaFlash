
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardHeader({ title, description }: { title: string; description?: string }) {

  return (
    <header className="sticky top-0 z-30 flex h-14 items-start gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div>
        <h1 className="font-headline text-xl font-semibold sm:text-2xl">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </header>
  );
}
