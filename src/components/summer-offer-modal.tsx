
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Separator } from './ui/separator';
import { CheckCircle, Sun, Moon, Briefcase, Star, Wifi, Mail, Phone, UserPlus } from 'lucide-react';
import type { Campaign } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


interface SummerOfferModalProps {
  setDialogOpen: (open: boolean) => void;
  campaign: Campaign;
}

const plans = [
    {
        name: 'Paquete Fin de Semana',
        price: 250,
        duration: '3 Días / 2 Noches',
        icon: Moon,
        features: ['Habitación Doble', 'Desayuno Buffet', 'Acceso a Piscina'],
    },
    {
        name: 'Semana Completa',
        price: 750,
        duration: '7 Días / 6 Noches',
        icon: Sun,
        features: ['Todo lo del plan Fin de Semana', 'Cena a la carta', 'Excursión local'],
    },
    {
        name: 'Business & Pleasure',
        price: 950,
        duration: '7 Días / 6 Noches',
        icon: Briefcase,
        features: ['Todo lo del plan Semana Completa', 'Acceso a Business Center', 'WiFi de Alta Velocidad'],
    },
]

export function SummerOfferModal({ setDialogOpen, campaign }: SummerOfferModalProps) {
    const { adCreative } = campaign;
    const [alertOpen, setAlertOpen] = useState(false);

    if (!adCreative) return null;

    const handleBooking = () => {
        setAlertOpen(true);
    }

  return (
    <>
    <div className="max-h-[90vh] overflow-y-auto">
        <CardHeader className='p-0'>
            <div className="relative">
                <Image 
                    src={adCreative.imageUrl}
                    alt={adCreative.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={adCreative.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold font-headline text-white">{adCreative.title}</h2>
                    <p className="text-lg text-white/90">{adCreative.subtitle} en las playas de Cancún</p>
                </div>
                 {adCreative.discount && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-lg font-bold py-2 px-4 rounded-full transform rotate-12">
                        {adCreative.discount}
                    </div>
                 )}
            </div>
        </CardHeader>
      
        <div className="p-6">
            <CardDescription className='text-center text-base'>
                ¡Tu escapada de ensueño te espera! Elige el plan que mejor se adapte a tus vacaciones y prepárate para relajarte.
            </CardDescription>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {plans.map(plan => (
                    <Card key={plan.name} className="flex flex-col">
                        <CardHeader className="text-center">
                            <plan.icon className="mx-auto h-8 w-8 text-primary mb-2" />
                            <CardTitle className="font-headline">{plan.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{plan.duration}</p>
                            <p className="text-2xl font-bold font-headline">${plan.price}</p>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <ul className="space-y-2 text-sm text-muted-foreground flex-grow">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full mt-4" onClick={handleBooking}>
                                Reservar Ahora
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Separator className="my-6" />

            <div className="text-center">
                <h3 className="font-headline text-lg">Todas las reservas incluyen</h3>
                <div className="flex justify-center items-center gap-6 mt-4 text-muted-foreground text-sm">
                    <div className='flex items-center gap-2'><Star className='h-4 w-4 text-yellow-500' /> Servicio 5 Estrellas</div>
                    <div className='flex items-center gap-2'><Wifi className='h-4 w-4 text-blue-500' /> WiFi Gratuito</div>
                </div>
            </div>
        </div>
    </div>
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className='font-headline'>Completa tu Reserva</AlertDialogTitle>
                <AlertDialogDescription>
                    Para finalizar tu reserva, por favor completa uno de los siguientes pasos:
                </AlertDialogDescription>
                <ul className="pt-4 space-y-3 text-left text-sm text-muted-foreground">
                    <li className='flex items-start gap-3'>
                        <UserPlus className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <Link href="#" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">
                                Regístrate en nuestro sitio web
                            </Link>
                            <div className='text-xs'>Crea una cuenta para gestionar tu reserva y acceder a ofertas exclusivas.</div>
                        </div>
                    </li>
                    <li className='flex items-start gap-3'>
                        <Mail className="h-5 w-5 text-primary mt-0.5"/>
                            <div>
                            <span className='font-semibold text-foreground'>Contáctanos por correo</span>
                            <div className='text-xs'>viajes@solyarena.com</div>
                        </div>
                    </li>
                        <li className='flex items-start gap-3'>
                        <Phone className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <span className='font-semibold text-foreground'>Llámanos</span>
                            <div className='text-xs'>+1 (800) 555-0123</div>
                        </div>
                    </li>
                </ul>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setAlertOpen(false)}>Entendido</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}