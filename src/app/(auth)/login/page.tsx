
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wifi, ChevronRight, Loader2, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
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
import { Logo } from '@/components/logo';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function WifiPortalPage() {
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [summerDialogOpen, setSummerDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('usuario@ejemplo.com');
  const [password, setPassword] = useState('password');
  const router = useRouter();
  const auth = useAuth();
  const summerCampaign = campaignsData.find(
    (c) => c.name === 'Campaña de Verano 2025'
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError('El correo electrónico y la contraseña son requeridos.');
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/invalid-credential'
        ) {
          setError('Correo o contraseña incorrectos.');
        } else {
          setError('Ocurrió un error inesperado al iniciar sesión.');
        }
      } else {
        setError('Ocurrió un error inesperado.');
      }
      setIsLoading(false);
    }
  };


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

      <main className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 py-24">
        
        <div className="w-full max-w-md lg:max-w-sm shrink-0">
          <Card className="w-full shadow-2xl bg-card text-card-foreground animate-fade-in-up">
            <CardHeader className="text-center items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 border-8 border-background">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl">Acceso a PujaFlash</CardTitle>
              <CardDescription>
                Inicia sesión para conectarte a la red WiFi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                {error && (
                  <Alert variant="destructive">
                    <TriangleAlert className="h-4 w-4" />
                    <AlertTitle>Error de Inicio de Sesión</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="usuario@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                  disabled={!email || !password || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    'Conectarse a la red'
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">¿No tienes cuenta? </span>
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Regístrate aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full max-w-md lg:max-w-lg space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-center lg:text-left text-white font-headline opacity-0 animate-fade-in-down animation-delay-300">Mientras te conectas, descubre estas ofertas</h2>
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
