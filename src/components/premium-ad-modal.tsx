
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Check, Gift, Tv, Film, WifiOff, Users, Play, Star, Globe, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { PricingModal } from './pricing-modal';
import { AppProvider } from '@/context/app-context';

const features = [
    { icon: Film, text: "Películas 4K" },
    { icon: Tv, text: "Series exclusivas" },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500"><path d="M10.5 17H4.5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v3.5"/><path d="m14 17 3.1-3.1a2.1 2.1 0 0 1 3 3L17 20l-3.1-3.1a2.1 2.1 0 0 1-3-3z"/><path d="M8.5 11.5 7 13l-1.5-1.5"/></svg>, text: "Sin anuncios" },
    { icon: Users, text: "5 pantallas" },
    { icon: WifiOff, text: "Descarga offline" },
    { icon: Play, text: "Deportes en vivo" },
];

const popularContent = [
  { id: 1, src: "https://picsum.photos/seed/accion/200/300", alt: "Película de acción", hint: "action movie", label: "Acción" },
  { id: 2, src: "https://picsum.photos/seed/drama/200/300", alt: "Película de drama", hint: "drama movie", label: "Drama" },
  { id: 3, src: "https://picsum.photos/seed/documental/200/300", alt: "Documental de naturaleza", hint: "nature documentary", label: "Documental" },
];

const stats = [
    { icon: Play, value: "50,000+", label: "Títulos" },
    { icon: Star, value: "4.9/5", label: "Calificación" },
    { icon: Globe, value: "190+", label: "Países" },
];

interface PremiumAdModalProps {
  setDialogOpen: (open: boolean) => void;
}

export function PremiumAdModal({ setDialogOpen }: PremiumAdModalProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setAlertOpen(true);
    }, 2000);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setDialogOpen(false);
  }

  return (
    <>
        <div className="max-h-[90vh] overflow-y-auto">
            <div className="relative">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <Image src="https://picsum.photos/seed/stream1/600/400" alt="Streaming service promotion 1" width={600} height={400} className="w-full h-auto object-cover" data-ai-hint="streaming service interface" />
                        </CarouselItem>
                        <CarouselItem>
                            <Image src="https://picsum.photos/seed/stream2/600/400" alt="Streaming service promotion 2" width={600} height={400} className="w-full h-auto object-cover" data-ai-hint="movie collage" />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold py-1 px-3 rounded-full">¡Oferta Limitada!</div>
            </div>

        <div className="p-6">
            <div className="flex items-center gap-3">
            <div className="bg-purple-600 rounded-lg p-2">
                <Play className="h-6 w-6 text-white" />
            </div>
            <div>
                <h2 className="text-xl font-bold font-headline">StreamMax Premium</h2>
                <p className="text-sm text-muted-foreground">Entretenimiento sin límites</p>
            </div>
            </div>

            <Card className="mt-4 bg-purple-50 border border-purple-200 shadow-none">
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-purple-700" />
                <h3 className="text-md font-bold text-purple-800">Oferta Especial</h3>
                </div>
                <p className="text-lg font-extrabold text-purple-900 mt-2">¡3 meses completamente GRATIS!</p>
                <p className="text-xs text-muted-foreground mt-1">Después solo $12.99/mes • Cancela cuando quieras</p>
            </CardContent>
            </Card>

            <div className="mt-6">
            <h3 className="font-bold text-lg">¿Qué incluye?</h3>
<ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
{features.map((feature) => {
        // Desestructuramos el icono del feature
        const { icon: Icon } = feature; 
        
        // Hacemos un cast para que TypeScript acepte el uso condicional de React.isValidElement
        const IconComponent = Icon as React.ElementType; 

        return (
            <li key={feature.text} className="flex items-center gap-2">
                {/* 1. Si es un elemento React (el SVG), lo devolvemos directamente. */}
                {React.isValidElement(Icon) ? (
                    Icon
                ) : (
                    // 2. Si no es un elemento, DEBE ser el componente Lucide,
                    // y lo renderizamos usando la variable casteada (IconComponent)
                    <IconComponent className="h-4 w-4 text-green-500" />
                )}
                <span className="text-muted-foreground">{feature.text}</span>
            </li>
        );
    })}
</ul>
            </div>
            
            <div className="mt-6">
                <h3 className="font-bold text-lg">Contenido Popular</h3>
                <div className="grid grid-cols-3 gap-2 mt-3">
                    {popularContent.map(content => (
                        <div key={content.id} className="text-center">
                            <Image src={content.src} alt={content.alt} width={200} height={300} className="rounded-md object-cover" data-ai-hint={content.hint}/>
                            <p className="text-sm mt-1 text-muted-foreground">{content.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-secondary/50 border-none shadow-none">
                        <CardContent className="p-3 flex flex-col items-center justify-center text-center">
                            <stat.icon className="h-5 w-5 mb-1 text-muted-foreground" />
                            <p className="font-bold text-sm">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700" 
                onClick={handleActivate}
                disabled={isActivating}
            >
                {isActivating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Activando suscripción...
                    </>
                ) : (
                    'Reclamar 3 meses gratis'
                )}
            </Button>
            <Dialog open={pricingDialogOpen} onOpenChange={setPricingDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full mt-2">
                        Ver planes y precios
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl p-0">
                    <AppProvider>
                        <PricingModal setDialogOpen={setPricingDialogOpen} />
                    </AppProvider>
                </DialogContent>
            </Dialog>

            <div className="mt-4 text-center text-xs text-muted-foreground">
                <p>Oferta válida para nuevos usuarios • Términos y condiciones aplican</p>
            </div>
        </div>
        </div>
        
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>PujaFlash dice</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¡Felicidades! Tu suscripción a StreamMax Premium ha sido activada. Disfruta de 3 meses completamente gratis.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleAlertClose}>Aceptar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
}
