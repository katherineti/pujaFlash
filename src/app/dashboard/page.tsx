
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Crown, Signal, MousePointerClick, Timer } from 'lucide-react';
import { AdCard } from '@/components/ad-card';
import { campaignsData } from '@/lib/campaign-data';
import { AdColumn } from '@/components/dashboard/ad-column';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Video, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RestaurantModal } from '@/components/restaurant-modal';
import { GymModal } from '@/components/gym-modal';
import { ElectronicsStoreModal } from '@/components/electronics-store-modal';
import type { Campaign } from '@/lib/types';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { useApp } from '@/context/app-context';

const specialOffers = campaignsData.filter((c) =>
  ['Restaurante La Plaza', 'Gimnasio FitLife', 'Tienda de Electrónicos'].includes(
    c.name
  )
);

const quickAccessLinks = [
  {
    icon: Globe,
    label: 'Navegador',
    href: 'https://www.google.com',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'https://mail.google.com',
  },
  {
    icon: Video,
    label: 'Videos',
    href: 'https://www.youtube.com',
  },
  {
    icon: ShoppingCart,
    label: 'Compras',
    href: 'https://www.amazon.com',
  },
];

export default function DashboardPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const { currentPlan, currentUser } = useApp();

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDialogClose = () => {
    setSelectedCampaign(null);
  };

  const getModalContent = () => {
    if (!selectedCampaign) return null;

    switch (selectedCampaign.name) {
      case 'Restaurante La Plaza':
        return <RestaurantModal campaign={selectedCampaign} />;
      case 'Gimnasio FitLife':
        return <GymModal campaign={selectedCampaign} setDialogOpen={handleDialogClose} />;
      case 'Tienda de Electrónicos':
        return <ElectronicsStoreModal campaign={selectedCampaign} />;
      default:
        return null;
    }
  };

  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario';
  const displayEmail = currentUser?.email || 'Disfruta de tu navegación gratuita.';
  
  const activeCampaigns = campaignsData.filter(c => c.status === 'Activa');
  const totalActiveCampaigns = activeCampaigns.length;
  const averageClicks = totalActiveCampaigns > 0 ? Math.round(activeCampaigns.reduce((acc, c) => acc + c.clicks, 0) / totalActiveCampaigns) : 0;

  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader
        title={`¡Bienvenido, ${displayName}!`}
        description={displayEmail}
      />
      <main className="grid flex-1 items-start gap-8 md:grid-cols-3 lg:grid-cols-[1fr_350px]">
        {/* Main content */}
        <div className="grid auto-rows-max items-start gap-8 md:col-span-2 lg:col-span-1">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Tiempo Conectado" value="1h 15m" icon={Timer} description="Duración de tu sesión actual." />
            <StatsCard title="Datos Utilizados" value="256 MB" icon={Signal} description="Consumo en esta sesión." />
            <StatsCard title="Anuncios Activos" value={totalActiveCampaigns.toString()} icon={MousePointerClick} description="Campañas actualmente en circulación." />
            <StatsCard title="Plan actual" value={currentPlan.name} icon={Crown} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 font-headline">
              Ofertas especiales para ti
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialOffers.map((campaign) => (
                <div
                  key={campaign.name}
                  onClick={() => handleCampaignClick(campaign)}
                  className="cursor-pointer"
                >
                  <AdCard campaign={campaign} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 font-headline">Accesos rápidos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickAccessLinks.map((link) => (
                <Button
                  variant="outline"
                  key={link.label}
                  className="flex flex-col h-24 items-center justify-center gap-2 text-sm sm:text-base"
                  asChild
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-6 w-6 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <RecentActivity />
        </div>

        {/* Right Ad Column */}
        <AdColumn onCampaignClick={handleCampaignClick} />
      </main>

      <Dialog open={!!selectedCampaign} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent className="sm:max-w-2xl p-0">
          {selectedCampaign && (
            <>
              <DialogHeader className="p-0 sr-only">
                <DialogTitle>
                  {selectedCampaign.adCreative?.title || 'Detalles de la oferta'}
                </DialogTitle>
                <DialogDescription>
                  {selectedCampaign.adCreative?.description ||
                    'Más información sobre esta oferta especial.'}
                </DialogDescription>
              </DialogHeader>
              {getModalContent()}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
