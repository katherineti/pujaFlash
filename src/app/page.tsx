'use client';

import { useState } from 'react';
import { AdBanner } from '@/components/ad-banner';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import type { Campaign } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RestaurantModal } from '@/components/restaurant-modal';
import { ElectronicsStoreModal } from '@/components/electronics-store-modal';
import { SummerOfferModal } from '@/components/summer-offer-modal';

const exampleCampaigns: Campaign[] = [
  {
    name: 'Restaurante Bella Vista',
    status: 'Activa',
    budget: 0, spend: 0, clicks: 0, cpc: 0, ctr: 0,
    adCreative: {
      title: 'Restaurante Bella Vista',
      subtitle: 'Auténtica cocina italiana con vistas al mar.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1080&auto=format&fit=crop',
      imageHint: 'restaurante comida',
      cta: 'Ver oferta',
      offerTitle: 'Menú del día completo por solo 12€',
      offerSubtitle: 'Válido hasta: 31 de Diciembre 2024',
      description: 'Disfruta de nuestro exquisito menú del día con ingredientes frescos y locales.',
      location: 'Calle Ficticia 123, Madrid',
      phone: '+34 912 345 678',
      hours: 'Lunes a Domingo: 13:00 - 23:00',
    },
  },
  {
    name: 'TechStore',
    status: 'Activa',
    budget: 0, spend: 0, clicks: 0, cpc: 0, ctr: 0,
    adCreative: {
      title: 'TechStore',
      subtitle: 'Las mejores ofertas en tecnología de última generación.',
      imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1080&auto=format&fit=crop',
      imageHint: 'laptop tecnología',
      cta: 'Más información',
      offerTitle: 'Descuentos de hasta 50% en smartphones',
      offerSubtitle: 'Válido hasta: 28 de Febrero 2025',
      description: 'Los mejores precios en tecnología. Smartphones, tablets, laptops y accesorios.',
      location: 'Centro Comercial Gran Vía, Local 45',
      phone: '+34 912 345 999',
      hours: 'Lunes a Sábado: 10:00 - 22:00',
    },
  },
  {
    name: 'Hotel Paraíso',
    status: 'Activa',
    budget: 0, spend: 0, clicks: 0, cpc: 0, ctr: 0,
    adCreative: {
      title: 'Hotel Paraíso',
      subtitle: 'Tu escapada de lujo te espera. Reserva ahora.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1080&auto=format&fit=crop',
      imageHint: 'hotel piscina',
      cta: 'Reserva Ahora',
      discount: '20% OFF',
    },
  },
];

export default function LandingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDialogClose = () => {
    setSelectedCampaign(null);
  };

  const getModalContent = () => {
    if (!selectedCampaign) return null;
    switch (selectedCampaign.name) {
      case 'Restaurante Bella Vista':
        return <RestaurantModal campaign={selectedCampaign} />;
      case 'TechStore':
        return <ElectronicsStoreModal campaign={selectedCampaign} />;
      case 'Hotel Paraíso':
        return <SummerOfferModal campaign={selectedCampaign} setDialogOpen={handleDialogClose} />;
      default:
        return null;
    }
  };
  
  const [landingAd1, landingAd2, landingAd3] = exampleCampaigns;

  return (
    <div className="flex flex-col min-h-svh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />

        {landingAd1 && landingAd1.adCreative && (
          <div className="container mx-auto px-4 md:px-6 my-12">
            <Dialog onOpenChange={(open) => !open && handleDialogClose()}>
              <DialogTrigger asChild onClick={() => handleCampaignClick(landingAd1)}>
                <div className="cursor-pointer">
                  <AdBanner
                    src={landingAd1.adCreative.imageUrl}
                    title={landingAd1.adCreative.title}
                    subtitle={landingAd1.adCreative.subtitle}
                    alt={landingAd1.name}
                    data-ai-hint={landingAd1.adCreative.imageHint}
                  />
                </div>
              </DialogTrigger>
            </Dialog>
          </div>
        )}

        <Features />

        <div className="bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 py-12 grid gap-8">
            {landingAd2 && landingAd2.adCreative && (
              <Dialog onOpenChange={(open) => !open && handleDialogClose()}>
                <DialogTrigger asChild onClick={() => handleCampaignClick(landingAd2)}>
                   <div className="cursor-pointer">
                    <AdBanner
                        src={landingAd2.adCreative.imageUrl}
                        title={landingAd2.adCreative.title}
                        subtitle={landingAd2.adCreative.subtitle}
                        alt={landingAd2.name}
                        data-ai-hint={landingAd2.adCreative.imageHint}
                    />
                  </div>
                </DialogTrigger>
              </Dialog>
            )}
            {landingAd3 && landingAd3.adCreative && (
              <Dialog onOpenChange={(open) => !open && handleDialogClose()}>
                <DialogTrigger asChild onClick={() => handleCampaignClick(landingAd3)}>
                   <div className="cursor-pointer">
                    <AdBanner
                        src={landingAd3.adCreative.imageUrl}
                        title={landingAd3.adCreative.title}
                        subtitle={landingAd3.adCreative.subtitle}
                        alt={landingAd3.name}
                        data-ai-hint={landingAd3.adCreative.imageHint}
                    />
                  </div>
                </DialogTrigger>
              </Dialog>
            )}
          </div>
        </div>

        <HowItWorks />
      </main>

      <Dialog open={!!selectedCampaign} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent className="sm:max-w-2xl p-0">
          {selectedCampaign && (
            <>
              <DialogHeader className="p-0 sr-only">
                <DialogTitle>
                  {selectedCampaign.adCreative?.title || 'Detalles del anuncio'}
                </DialogTitle>
                <DialogDescription>
                  {selectedCampaign.adCreative?.subtitle || 'Más información sobre esta oferta.'}
                </DialogDescription>
              </DialogHeader>
              {getModalContent()}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}
