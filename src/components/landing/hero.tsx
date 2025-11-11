
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { ParticlesBackground } from './particles-background';

export function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop"
          alt="Digital Network"
          className="w-full h-full object-cover"
          data-ai-hint="digital network"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 text-center md:py-32 lg:py-40">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl font-headline animate-fade-in-down">
          Maximiza tu Visibilidad.
          <span className="block text-accent animate-fade-in-down animation-delay-300">
            Anúnciate en Portales Cautivos.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 sm:text-xl md:text-2xl animate-fade-in-up animation-delay-500">
          Pujaflash es la plataforma líder que conecta anunciantes con miles de
          usuarios de redes Wi-Fi a través de un innovador sistema de pujas por
          clic.
        </p>
        <div className="mt-8 flex justify-center gap-4 animate-fade-in-up animation-delay-700">
          <Button asChild size="lg">
            <Link href="/login">Empezar a Anunciar</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#how-it-works">Cómo Funciona</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
