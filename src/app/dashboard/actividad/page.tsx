
import { DashboardHeader } from '@/components/dashboard/header';
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
} from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import { History } from 'lucide-react';

const allActivities = [
    { title: 'Nueva campaña lanzada', description: 'La campaña "Venta de Verano" ha superado el 50% de su presupuesto.', time: 'hace 5 minutos', initials: 'VC' },
    { title: 'Factura pagada', description: 'Se ha procesado el pago de la factura INV-2205-005.', time: 'hace 1 hora', initials: 'FP' },
    { title: 'Anuncio aprobado', description: 'Tu nuevo anuncio para "Nuevos Arribos" ha sido aprobado.', time: 'hace 3 horas', initials: 'AA' },
    { title: 'Límite de presupuesto', description: 'La campaña "Vuelta al Cole" ha alcanzado el 80% de su presupuesto.', time: 'hace 1 día', initials: 'LC' },
    { title: 'Cambio de plan', description: 'Has cambiado al Plan Profesional.', time: 'hace 2 días', initials: 'CP' },
    { title: 'Usuario añadido', description: 'Se ha añadido a "marketing@ejemplo.com" al equipo.', time: 'hace 2 días', initials: 'UA' },
    { title: 'Factura generada', description: 'Nueva factura INV-2205-006 disponible.', time: 'hace 3 días', initials: 'FG' },
    { title: 'Campaña finalizada', description: 'La campaña "Liquidación de Invierno" ha concluido.', time: 'hace 5 días', initials: 'CF' },
    { title: 'Actualización de perfil', description: 'Tu información de perfil ha sido actualizada.', time: 'hace 1 semana', initials: 'AP' },
    { title: 'Campaña en borrador', description: 'Has guardado una nueva campaña "Promoción Fin de Semana" como borrador.', time: 'hace 1 semana', initials: 'CB' },
];

export default function ActividadPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader title="Actividad de la Cuenta" />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <History className="text-primary" />
                    Historial Completo
                </CardTitle>
                <CardDescription>
                    Aquí puedes ver todas las actividades y eventos de tu cuenta.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {allActivities.map((activity, index) => (
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
                 <Pagination className="mx-auto">
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}
