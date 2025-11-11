
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from './ui/badge';
import type { Campaign } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AdCardProps {
  campaign: Campaign;
  className?: string;
}

export function AdCard({ campaign, className }: AdCardProps) {
  if (!campaign.adCreative) {
    return null;
  }

  const { title, subtitle, imageUrl, imageHint, cta, discount } = campaign.adCreative;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent link navigation if it's wrapped in a dialog trigger
    const isDialogTrigger = (e.target as HTMLElement).closest('[role="button"]');
    if (isDialogTrigger) {
      // This allows the DialogTrigger to handle the click and open the modal
    } else {
      console.log(`Ad clicked: ${campaign.name}`);
    }
  };

  return (
    <div onClick={handleClick} className={cn("w-full", className)}>
        <Card className={`w-full overflow-hidden relative group`}>
            {imageUrl && (
                 <Image
                    src={imageUrl}
                    alt={campaign.name}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                    data-ai-hint={imageHint}
                />
            )}
            <div className="p-4">
            <span className='text-xs text-muted-foreground'>PATROCINADO</span>
            <h3 className="font-bold font-headline">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <Button size="sm" className="w-full mt-4" tabIndex={-1}>
                {cta}
            </Button>
            </div>
        {discount && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {discount}
            </Badge>
        )}
        </Card>
    </div>
  );
}
