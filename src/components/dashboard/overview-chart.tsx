'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { RevenueData } from '@/lib/types';

const chartData: RevenueData[] = [
    { month: 'Ene', revenue: 1860 },
    { month: 'Feb', revenue: 3050 },
    { month: 'Mar', revenue: 2370 },
    { month: 'Abr', revenue: 730 },
    { month: 'May', revenue: 2090 },
    { month: 'Jun', revenue: 2140 },
    { month: 'Jul', revenue: 2500 },
    { month: 'Ago', revenue: 2800 },
    { month: 'Sep', revenue: 2200 },
    { month: 'Oct', revenue: 3100 },
    { month: 'Nov', revenue: 3500 },
    { month: 'Dic', revenue: 4100 },
];

const chartConfig = {
  revenue: {
    label: 'Ingresos',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Resumen de Ingresos</CardTitle>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0}}>
            <CartesianGrid vertical={false} />
             <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickFormatter={(value) => `$${Number(value) / 1000}k`}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
