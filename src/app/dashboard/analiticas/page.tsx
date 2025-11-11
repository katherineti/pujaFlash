
import { DashboardHeader } from '@/components/dashboard/header';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingDown, TrendingUp, Wallet, MousePointerClick, Users, Activity, BarChart } from 'lucide-react';
import { AIOptimizer } from '@/components/dashboard/ai-optimizer';

const trafficData = [
  { source: 'Búsqueda Orgánica', visitors: 1245, conversionRate: 4.5 },
  { source: 'Referidos', visitors: 980, conversionRate: 3.2 },
  { source: 'Redes Sociales', visitors: 1560, conversionRate: 2.8 },
  { source: 'Campañas de Email', visitors: 750, conversionRate: 5.1 },
  { source: 'Tráfico Directo', visitors: 620, conversionRate: 2.1 },
];

export default function AnaliticasPage() {
  const totalRevenue = 15230.75;
  const totalSpend = 9850.50;
  const totalClicks = 25430;
  const roi = ((totalRevenue - totalSpend) / totalSpend) * 100;
  const averageCpc = totalSpend / totalClicks;


  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader title="Analíticas" />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Ingresos Totales"
            value={`$${totalRevenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            description="+20.1% vs el mes anterior"
          />
           <StatsCard
            title="Gasto Total en Publicidad"
            value={`$${totalSpend.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
            icon={Wallet}
            description="+15.5% vs el mes anterior"
          />
          <StatsCard
            title="Retorno de la Inversión (ROI)"
            value={`${roi.toFixed(2)}%`}
            icon={TrendingUp}
            description="Eficiencia de la inversión publicitaria"
          />
           <StatsCard
            title="Coste por Clic Promedio (CPC)"
            value={`$${averageCpc.toFixed(2)}`}
            icon={MousePointerClick}
            description="Coste medio por cada interacción"
          />
        </div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Visitantes Únicos"
            value="15,234"
            icon={Users}
            description="+12.5% vs el mes anterior"
          />
          <StatsCard
            title="Tasa de Rebote"
            value="45.2%"
            icon={TrendingDown}
            description="-5.2% vs el mes anterior"
          />
          <StatsCard
            title="Duración Media de la Sesión"
            value="3m 45s"
            icon={Activity}
            description="+25s vs el mes anterior"
          />
          <StatsCard
            title="Tasa de Conversión"
            value="4.8%"
            icon={BarChart}
            description="+0.8% vs el mes anterior"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 md:gap-8">
          <div className="lg:col-span-4">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Fuentes de Tráfico</CardTitle>
                <CardDescription>
                  Un desglose de dónde provienen tus visitantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fuente</TableHead>
                      <TableHead className="text-right">Visitantes</TableHead>
                      <TableHead className="text-right">Tasa de Conversión</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trafficData.map((data) => (
                      <TableRow key={data.source}>
                        <TableCell className="font-medium whitespace-nowrap">{data.source}</TableCell>
                        <TableCell className="text-right">{data.visitors.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{data.conversionRate.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <OverviewChart />
          </div>
        </div>
        <AIOptimizer />
      </main>
    </div>
  );
}
