
import { BarChart, Target, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';

const features = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: 'Audiencia Cautiva Garantizada',
    description:
      'Tus anuncios se muestran a usuarios que están activamente buscando conectarse a una red, asegurando una atención máxima.',
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Sistema de Pujas Inteligente',
    description:
      'Controla tu presupuesto con nuestro sistema de pago por clic (PPC). Paga solo cuando los usuarios interactúan con tu anuncio.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Segmentación Avanzada',
    description:
      'Dirige tus campañas a audiencias específicas basadas en ubicación, demografía y comportamiento para un mayor retorno de la inversión.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 bg-muted/30 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                ¿Por qué elegir Pujaflash?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                Llega a tus clientes en el momento justo y en el lugar adecuado.
            </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader className="items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
