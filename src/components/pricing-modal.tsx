
'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from './ui/dialog';
import { Check, ShieldCheck, Smartphone, BarChart, Settings, Cloud, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { SubscriptionModal } from './subscription-modal';
import type { Plan } from '@/lib/types';
import { useApp } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import { format, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const plans: Omit<Plan, 'renewalDate' | 'features'>[] = [
    { 
        name: 'Plan Gratuito', 
        price: "€0.00", 
        popular: false,
    },
    { 
        name: 'Plan Básico', 
        price: "€25.00", 
        popular: true,
    },
    { 
        name: 'Plan Profesional', 
        price: "€75.00",
        popular: false,
    },
    { 
        name: 'Plan Empresarial', 
        price: "€200.00",
        popular: false,
    },
];

const fullPlansData: Omit<Plan, 'renewalDate'>[] = [
    { 
        name: 'Plan Gratuito', 
        price: "€0.00", 
        features: [
            '1 campaña activa',
            '1000 impresiones/mes',
            'Analíticas básicas',
            'Soporte comunitario',
        ],
        popular: false,
    },
    { 
        name: 'Plan Básico', 
        price: "€25.00", 
        features: [
            '5 campañas activas',
            '10,000 impresiones/mes',
            'Analíticas detalladas',
            'Soporte por email',
        ],
        popular: true,
    },
    { 
        name: 'Plan Profesional', 
        price: "€75.00",
        features: [
            'Campañas ilimitadas',
            '100,000 impresiones/mes',
            'Optimización con IA',
            'Soporte prioritario',
        ],
        popular: false,
    },
    { 
        name: 'Plan Empresarial', 
        price: "€200.00",
        features: [
            'Todo lo del plan Profesional',
            'Impresiones sin límites',
            'Manager de cuenta dedicado',
            'SLA garantizado',
        ],
        popular: false,
    },
];


const sharedFeatures = [
    { icon: ShieldCheck, text: 'Seguridad WPA3 avanzada' },
    { icon: Smartphone, text: 'App móvil de gestión' },
    { icon: BarChart, text: 'Reportes mensuales detallados' },
    { icon: Zap, text: 'Uptime garantizado 99.9%' },
    { icon: Cloud, text: 'Backup automático en la nube' },
    { icon: Settings, text: 'Configuración remota' }
];

interface PricingModalProps {
  setDialogOpen: (open: boolean) => void;
}


export function PricingModal({ setDialogOpen }: PricingModalProps) {
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Omit<Plan, 'renewalDate'> | null>(null);
  const { setCurrentPlan } = useApp();
  const { toast } = useToast();

  const handleChoosePlan = (plan: Omit<Plan, 'renewalDate'>) => {
    const fullPlan = fullPlansData.find(p => p.name === plan.name);
    if (!fullPlan) return;

    const priceAmount = parseFloat(fullPlan.price.replace('€', '').replace(',', '.'));
    if (priceAmount > 0) {
        setSelectedPlan(fullPlan);
        setSubscriptionDialogOpen(true);
    } else {
        const nextRenewalDate = addMonths(new Date(), 1);
        setCurrentPlan({
            ...fullPlan,
            renewalDate: format(nextRenewalDate, "d 'de' MMMM, yyyy", { locale: es }),
        });
        toast({
            title: '¡Plan cambiado!',
            description: `Has cambiado exitosamente al ${fullPlan.name}.`,
        });
        setDialogOpen(false);
    }
  }

  const handleSubscriptionComplete = (newPlan: Omit<Plan, 'renewalDate'>, paymentMethod: string, paymentDetails?: any) => {
    const nextRenewalDate = addMonths(new Date(), 1);
    setCurrentPlan({
        ...newPlan,
        renewalDate: format(nextRenewalDate, "d 'de' MMMM, yyyy", { locale: es }),
    });
    setDialogOpen(false); // Close the main pricing modal
  };

  return (
    <>
        <div className="p-6">
            <DialogHeader className="text-center mb-8">
                <DialogTitle className="text-3xl font-bold font-headline">Planes y Precios PujaFlash</DialogTitle>
                <DialogDescription className="text-lg">Elige el plan que mejor se ajuste a tus necesidades.</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fullPlansData.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2 shadow-lg' : ''}`}>
                        {plan.popular && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                                Más Popular
                            </Badge>
                        )}
                        <CardHeader className="items-center text-center">
                            <CardTitle className="font-headline text-xl">{plan.name}</CardTitle>
                            <p className="text-4xl font-extrabold text-foreground">{plan.price}</p>
                            <p className="text-sm text-muted-foreground">/mes</p>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                            <ul className="space-y-3 text-sm text-muted-foreground flex-grow">
                                {plan.features?.map(feature => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button className={`w-full mt-6`} onClick={() => handleChoosePlan(plan)}>
                                {plan.name}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12">
                <h3 className="text-center text-xl font-bold font-headline mb-6">Características incluidas en todos los planes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                    {sharedFeatures.map(feature => (
                        <div key={feature.text} className="flex items-center gap-3">
                            <feature.icon className="h-5 w-5 text-primary" />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
            <DialogContent className="sm:max-w-2xl p-0">
                {selectedPlan && (
                  <SubscriptionModal 
                    plan={selectedPlan} 
                    setDialogOpen={setSubscriptionDialogOpen}
                    onSubscriptionComplete={handleSubscriptionComplete}
                    onClosePricingModal={() => setDialogOpen(false)}
                   />
                )}
            </DialogContent>
        </Dialog>
    </>
  );
}
