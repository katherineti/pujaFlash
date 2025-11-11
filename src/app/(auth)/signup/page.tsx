
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { SignupForm } from '@/components/signup-form';
import { Logo } from '@/components/logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PremiumAdModal } from '@/components/premium-ad-modal';
import { AdCard } from '@/components/ad-card';
import { campaignsData } from '@/lib/campaign-data';
import { SummerOfferModal } from '@/components/summer-offer-modal';

export default function SignupPage() {
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [summerDialogOpen, setSummerDialogOpen] = useState(false);
  const summerCampaign = campaignsData.find(
    (c) => c.name === 'Campaña de Verano 2025'
  );

  return (
    <div className="min-h-svh w-full flex flex-col items-center justify-center p-4 font-body text-white">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline">Pujaflash</span>
        </Link>
        <div className="text-slate-300 hidden sm:block">
          <span>Acceso seguro a internet</span>
        </div>
      </header>

       <main className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-16 py-24">
        
        <div className="w-full max-w-md lg:max-w-sm shrink-0">
          <Card className="w-full shadow-2xl bg-card text-card-foreground animate-fade-in-up">
            <CardHeader className="text-center items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-8 border-background">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl">Crear una Cuenta</CardTitle>
              <CardDescription>
                Regístrate para empezar a anunciarte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-md lg:max-w-lg space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-white font-headline opacity-0 animate-fade-in-down animation-delay-300">Empieza a llegar a miles de clientes potenciales</h2>
            {summerCampaign && (
            <Dialog open={summerDialogOpen} onOpenChange={setSummerDialogOpen}>
                <DialogTrigger asChild>
                <div className="w-full cursor-pointer group transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in-up animation-delay-500">
                    <AdCard campaign={summerCampaign} />
                </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl p-0">
                <DialogHeader className="p-0 sr-only">
                    {summerCampaign.adCreative && (
                    <DialogTitle>{summerCampaign.adCreative.title}</DialogTitle>
                    )}
                    {summerCampaign.adCreative && (
                    <DialogDescription>
                        {summerCampaign.adCreative.subtitle} en las playas de Cancún
                    </DialogDescription>
                    )}
                </DialogHeader>
                <SummerOfferModal
                    setDialogOpen={setSummerDialogOpen}
                    campaign={summerCampaign}
                />
                </DialogContent>
            </Dialog>
            )}
            <Dialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen}>
            <DialogTrigger asChild>
                <div className="w-full cursor-pointer group transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl opacity-0 animate-fade-in-up animation-delay-700">
                    <Card className="w-full overflow-hidden relative bg-white/10 border-white/20 backdrop-blur-lg">
                        <div className="block">
                            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600">
                            <h3 className="font-bold">Streaming Premium</h3>
                            <p className="text-sm opacity-90">3 meses gratis</p>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-2 group-hover:bg-white/40 transition-colors">
                            <ChevronRight className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="absolute top-1 right-1 bg-black/50 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            PATROCINADO
                        </div>
                    </Card>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
                <DialogHeader className="p-4 border-b">
                <DialogTitle className="font-headline">
                    Anuncio Premium de StreamMax
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Una oferta especial para el servicio de streaming StreamMax Premium. Obtén
                    3 meses gratis.
                </DialogDescription>
                </DialogHeader>
                <PremiumAdModal setDialogOpen={setPremiumDialogOpen} />
            </DialogContent>
            </Dialog>
        </div>
      </main>
    </div>
  );
}
