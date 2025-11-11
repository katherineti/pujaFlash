
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const steps = [
  {
    step: 1,
    title: 'Crea tu Campaña',
    description: 'Define tu anuncio, establece un presupuesto de campaña para tus pujas por clic (PPC) y elige tu público objetivo con nuestras herramientas de segmentación.',
  },
  {
    step: 2,
    title: 'Entra en la Subasta',
    description: 'Nuestro sistema de pujas en tiempo real utiliza tu presupuesto para determinar qué anuncios se muestran. ¡Puja de forma competitiva para ganar visibilidad!',
  },
  {
    step: 3,
    title: 'El Usuario se Conecta',
    description: 'Cuando un usuario se conecta a una red Wi-Fi asociada, tu anuncio aparece en el portal cautivo, justo antes de obtener acceso a internet.',
  },
    {
    step: 4,
    title: 'Mide tus Resultados',
    description: 'Analiza el rendimiento de tus campañas con métricas detalladas: clics, CTR, conversiones y más, todo desde tu dashboard.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Simple, Transparente y Efectivo
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            En solo cuatro pasos, tus anuncios estarán frente a miles de nuevos clientes potenciales.
          </p>
        </div>
        <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-border md:block" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {steps.map((step, index) => (
                    <div key={step.step} className="relative flex items-start space-x-6">
                        <div className="hidden md:flex relative items-center justify-center">
                             <div className={`absolute ${index % 2 === 0 ? 'left-1/2 -translate-x-[29px]' : 'left-1/2 translate-x-[21px]'} top-9 h-px w-6 bg-border`}/>
                             <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground font-headline">
                                {step.step}
                            </div>
                        </div>
                        <Card className={`w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <CardHeader>
                                <div className="flex items-center md:hidden mb-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground font-headline">
                                        {step.step}
                                    </div>
                                </div>
                                <CardTitle className="font-headline">{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

