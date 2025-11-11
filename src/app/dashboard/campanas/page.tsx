
'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { CreateCampaignForm, type NewCampaign } from '@/components/dashboard/create-campaign-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { campaignsData } from '@/lib/campaign-data';
import { Campaign } from '@/lib/types';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Activa': 'default',
  'Pausada': 'secondary',
  'Finalizada': 'destructive',
  'Borrador': 'outline',
};

const statusColor: { [key: string]: string } = {
    'Activa': 'bg-green-600',
    'Pausada': 'bg-yellow-500',
    'Finalizada': 'bg-red-700',
    'Borrador': 'bg-gray-500',
}

export default function CampanasPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [campaigns, setCampaigns] = useState(campaignsData);
/* 
    const handleCampaignCreate = (newCampaign: NewCampaign) => {
        const campaignToAdd = {
            ...newCampaign,
            status: 'Borrador',
            spend: 0,
            clicks: 0,
            cpc: 0,
            ctr: 0,
        };
        setCampaigns(prevCampaigns => [...prevCampaigns, campaignToAdd]);
    }; */

const CampaignToAdd: Campaign = { // <--- Aserción de tipo aquí
        name: "Nueva Campaña",
        status: "Borrador", // Ya que es un literal, es compatible.
        spend: 0,
        clicks: 0,
        cpc: 0,
        ctr: 0,
        budget: 0,
        endDate: new Date(),
        // Asegúrate de incluir todas las propiedades requeridas por la interfaz Campaign
    } as Campaign;

  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader title="Campañas de Anuncios" />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-2">
                <CardTitle className="font-headline">Tus Campañas</CardTitle>
                <CardDescription>
                Gestiona, analiza y crea nuevas campañas de anuncios para tu audiencia.
                </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full sm:w-auto gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Crear Campaña
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className='font-headline'>Crear Nueva Campaña</DialogTitle>
                  <DialogDescription>
                    Completa los detalles a continuación para lanzar tu nueva campaña publicitaria.
                  </DialogDescription>
                </DialogHeader>
                <CreateCampaignForm setDialogOpen={setDialogOpen} onCampaignCreate={handleCampaignCreate} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Nombre</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Presupuesto</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Gasto</TableHead>
                  <TableHead className="text-right">Clics</TableHead>
                  <TableHead className="text-right whitespace-nowrap">CPC Promedio</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.name}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={statusVariant[campaign.status]} className={`${statusColor[campaign.status]} hover:${statusColor[campaign.status]}`}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">${campaign.budget.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">${campaign.spend.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{campaign.clicks.toLocaleString('es-ES')}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">${campaign.cpc.toFixed(2)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{campaign.ctr.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
