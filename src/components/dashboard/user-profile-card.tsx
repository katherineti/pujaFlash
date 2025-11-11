
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/app-context';
import { Skeleton } from '../ui/skeleton';

export function UserProfileCard() {
  const { currentUser, isLoading } = useApp();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1 && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
        <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
                <Skeleton className="h-16 w-16 rounded-full mb-2" />
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-9 w-full mt-4" />
            </CardContent>
        </Card>
    );
  }

  if (!currentUser) {
    return (
        <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
                 <p className="text-sm text-muted-foreground">No has iniciado sesión.</p>
                 <Button variant="outline" size="sm" asChild className="mt-4 w-full">
                    <Link href="/login">Iniciar Sesión</Link>
                 </Button>
            </CardContent>
        </Card>
    );
  }
  
  const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuario';
  const email = currentUser.email || '';

  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Avatar className="h-16 w-16 mb-2">
          {currentUser.photoURL && (
            <AvatarImage
              src={currentUser.photoURL}
              alt={displayName}
            />
          )}
          <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold break-all">{displayName}</p>
        <p className="text-xs text-muted-foreground break-all">
          {email}
        </p>
        <Button variant="outline" size="sm" asChild className="mt-4 w-full">
          <Link href="/dashboard/configuracion">Ver perfil completo</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
