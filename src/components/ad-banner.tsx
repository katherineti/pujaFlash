'use client';

import Image from 'next/image';
import { Card } from './ui/card';

type AdBannerProps = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  'data-ai-hint'?: string;
  priority?: boolean;
};

export function AdBanner({
  src,
  alt,
  title,
  subtitle,
  'data-ai-hint': aiHint,
  priority = false,
}: AdBannerProps) {
  // In a real application, this click would be tracked on the backend
  const handleClick = () => {
    console.log(`Ad clicked: ${alt}`);
  };

  return (
    <Card className="overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl w-full cursor-pointer group relative">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={300}
          data-ai-hint={aiHint}
          priority={priority}
          className="h-auto w-full object-cover aspect-[4/1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center p-8">
            <h3 className="text-white text-2xl md:text-4xl font-bold font-headline drop-shadow-lg">{title}</h3>
            <p className="text-white/90 text-sm md:text-lg mt-2 max-w-md drop-shadow-md">{subtitle}</p>
        </div>
    </Card>
  );
}
