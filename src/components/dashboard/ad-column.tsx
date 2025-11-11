
'use client';

import { campaignsData } from '@/lib/campaign-data';
import { AdCard } from '../ad-card';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Wifi } from 'lucide-react';
import { UserProfileCard } from './user-profile-card';
import type { Campaign } from '@/lib/types';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PricingModal } from '@/components/pricing-modal';
import { useState } from 'react';

const adColumnCampaigns = campaignsData.filter(c => ['Restaurante La Plaza', 'Gimnasio FitLife', 'Tienda de Electrónicos'].includes(c.name));

interface AdColumnProps {
    onCampaignClick: (campaign: Campaign) => void;
}

export function AdColumn({ onCampaignClick }: AdColumnProps) {
    const [pricingDialogOpen, setPricingDialogOpen] = useState(false);

    return (
        <div className="space-y-6 md:col-span-1 lg:col-span-1">
            <UserProfileCard />
            {adColumnCampaigns.map(campaign => (
                <div key={campaign.name} onClick={() => onCampaignClick(campaign)} className="cursor-pointer">
                    <AdCard campaign={campaign} />
                </div>
            ))}
             <Dialog open={pricingDialogOpen} onOpenChange={setPricingDialogOpen}>
                <DialogTrigger asChild>
                    <Card className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">¿Quieres más velocidad?</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Actualiza a Premium y navega sin límites</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">Actualizar ahora</Button>
                        </CardFooter>
                    </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl p-0">
                    <PricingModal setDialogOpen={setPricingDialogOpen} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
