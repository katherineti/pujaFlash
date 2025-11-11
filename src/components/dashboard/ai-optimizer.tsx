'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { runOptimization } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, List, Zap } from 'lucide-react';

const initialState = {
  recommendedAdPlacements: '',
  recommendedBiddingStrategies: '',
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizando...
        </>
      ) : (
        <>
          <Zap className="mr-2 h-4 w-4" /> Optimizar Ubicaciones
        </>
      )}
    </Button>
  );
}

export function AIOptimizer() {
  const [state, formAction] = useActionState(runOptimization, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-primary" />
            <span>Optimizador de Ubicación de Anuncios con IA</span>
          </CardTitle>
          <CardDescription>
            Introduce datos de comportamiento del usuario y rendimiento de anuncios para obtener recomendaciones de la IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="user-behavior">Datos de Comportamiento del Usuario</Label>
            <Textarea
              id="user-behavior"
              name="userBehaviorData"
              placeholder="Pega aquí los datos de comportamiento del usuario (p. ej., historial de navegación, patrones de clics, métricas de participación)."
              rows={5}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ad-performance">Datos de Rendimiento de Anuncios</Label>
            <Textarea
              id="ad-performance"
              name="adPerformanceData"
              placeholder="Pega aquí los datos de rendimiento de los anuncios (p. ej., tasas de clics, tasas de conversión, ingresos)."
              rows={5}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <SubmitButton />
          {state?.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {state?.recommendedAdPlacements && (
            <Card className="w-full bg-secondary/50">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <List />
                    Ubicaciones de Anuncios Recomendadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.recommendedAdPlacements}</p>
              </CardContent>
            </Card>
          )}
          {state?.recommendedBiddingStrategies && (
            <Card className="w-full bg-secondary/50">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Zap />
                    Estrategias de Puja Recomendadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.recommendedBiddingStrategies}</p>
              </CardContent>
            </Card>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
