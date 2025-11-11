
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Clock, MapPin, Phone, Share2, Zap, Verified } from 'lucide-react';
import type { Campaign } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface ElectronicsStoreModalProps {
  campaign: Campaign;
}

export function ElectronicsStoreModal({ campaign }: ElectronicsStoreModalProps) {
    const { toast } = useToast();
    const { adCreative } = campaign;

    if (!adCreative) return null;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: adCreative.title,
                    text: adCreative.offerTitle,
                    url: window.location.href,
                });
                toast({ title: "¡Compartido con éxito!" });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "No se pudo compartir",
                    description: "Hubo un error al intentar compartir la oferta.",
                });
            }
        } else {
             await navigator.clipboard.writeText(window.location.href);
             toast({
                title: "Enlace copiado",
                description: "El enlace de la oferta ha sido copiado al portapapeles.",
            });
        }
    };
    
  return (
    <div className="max-h-[90vh] overflow-y-auto">
        <div className="relative">
            <Image 
                src={adCreative.imageUrl}
                alt={adCreative.title}
                width={800}
                height={300}
                className="w-full h-48 object-cover"
                data-ai-hint={adCreative.imageHint}
            />
        </div>
      
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold font-headline">{adCreative.title}</h2>
            
            <div className="rounded-lg bg-gradient-to-r from-primary to-purple-600 p-4 text-primary-foreground">
                <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    <h3 className="font-bold text-lg">¡OFERTA ESPECIAL!</h3>
                </div>
                <p className="mt-2 font-semibold">{adCreative.offerTitle}</p>
                <p className="text-sm opacity-90">{adCreative.offerSubtitle}</p>
            </div>
            
            <div>
                <h3 className="font-bold text-base mb-2">Descripción</h3>
                <p className="text-sm text-muted-foreground">{adCreative.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <h4 className="font-semibold">Ubicación</h4>
                        <p className="text-muted-foreground">{adCreative.location}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                     <div>
                        <h4 className="font-semibold">Teléfono</h4>
                        <p className="text-muted-foreground">{adCreative.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 col-span-1 md:col-span-2">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                     <div>
                        <h4 className="font-semibold">Horarios de atención</h4>
                        <p className="text-muted-foreground">{adCreative.hours}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="w-full">
                    <Link href={`tel:${adCreative.phone}`}><Phone className="mr-2 h-4 w-4" /> Llamar ahora</Link>
                </Button>
                 <Button asChild variant="secondary" className="w-full bg-green-600 text-white hover:bg-green-700">
                    <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adCreative.location || '')}`} target="_blank"><MapPin className="mr-2 h-4 w-4" /> Ver ubicación</Link>
                </Button>
                <Button variant="secondary" className="w-full" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Compartir
                </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Verified className="h-4 w-4 text-green-500" />
                <span>Anuncio verificado • 312 personas han visto esta oferta</span>
            </div>
        </div>
    </div>
  );
}
