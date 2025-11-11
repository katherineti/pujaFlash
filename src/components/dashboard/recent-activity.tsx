
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, History } from 'lucide-react';

const activities = [
  {
    title: 'Nueva campaña lanzada',
    description: 'La campaña "Venta de Verano" ha superado el 50% de su presupuesto.',
    time: 'hace 5 minutos',
    initials: 'VC'
  },
  {
    title: 'Factura pagada',
    description: 'Se ha procesado el pago de la factura INV-2205-005.',
    time: 'hace 1 hora',
    initials: 'FP'
  },
  {
    title: 'Anuncio aprobado',
    description: 'Tu nuevo anuncio para "Nuevos Arribos" ha sido aprobado.',
    time: 'hace 3 horas',
    initials: 'AA'
  },
  {
    title: 'Límite de presupuesto',
    description: 'La campaña "Vuelta al Cole" ha alcanzado el 80% de su presupuesto.',
    time: 'hace 1 día',
    initials: 'LC'
  },
];


export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <History className="text-primary" />
            Actividad Reciente
        </CardTitle>
        <CardDescription>Un vistazo rápido a las últimas novedades de tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-secondary">{activity.initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground/70">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
       <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <Link href="/dashboard/actividad">
            Ver toda la actividad
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
