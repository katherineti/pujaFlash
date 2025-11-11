'use server';

/**
 * @fileOverview Optimiza la ubicación de los anuncios y las estrategias de puja utilizando IA para maximizar los ingresos por publicidad.
 *
 * - optimizeAdPlacement - Una función que desencadena el proceso de optimización de la ubicación de los anuncios.
 * - OptimizeAdPlacementInput - El tipo de entrada para la función optimizeAdPlacement, que incluye el comportamiento del usuario y los datos de rendimiento de los anuncios.
 * - OptimizeAdPlacementOutput - El tipo de retorno para la función optimizeAdPlacement, que proporciona ubicaciones de anuncios y estrategias de puja recomendadas.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeAdPlacementInputSchema = z.object({
  userBehaviorData: z
    .string()
    .describe(
      'Datos sobre el comportamiento del usuario, incluyendo historial de navegación, patrones de clics y métricas de interacción.'
    ),
  adPerformanceData: z
    .string()
    .describe(
      'Datos sobre el rendimiento de los anuncios, incluyendo tasas de clics, tasas de conversión y ingresos generados.'
    ),
});
export type OptimizeAdPlacementInput = z.infer<typeof OptimizeAdPlacementInputSchema>;

const OptimizeAdPlacementOutputSchema = z.object({
  recommendedAdPlacements: z
    .string()
    .describe(
      'Ubicaciones de anuncios recomendadas (ej. "Página de inicio de sesión", "Banner post-autenticación") basadas en el análisis de IA del comportamiento del usuario y los datos de rendimiento de los anuncios.'
    ),
  recommendedBiddingStrategies: z
    .string()

    .describe(
      'Estrategias de puja recomendadas para maximizar el retorno de la inversión en un sistema de pago por clic (PPC). Considera el coste por clic (CPC) y el valor del cliente.'
    ),
});
export type OptimizeAdPlacementOutput = z.infer<typeof OptimizeAdPlacementOutputSchema>;

export async function optimizeAdPlacement(input: OptimizeAdPlacementInput): Promise<OptimizeAdPlacementOutput> {
  return optimizeAdPlacementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeAdPlacementPrompt',
  input: {schema: OptimizeAdPlacementInputSchema},
  output: {schema: OptimizeAdPlacementOutputSchema},
  prompt: `Eres un experto en optimización de publicidad para portales cautivos que funcionan con un modelo de pago por clic (PPC). Tu objetivo es maximizar el retorno de la inversión de los anunciantes.

Analiza los siguientes datos:

Datos de Comportamiento del Usuario: {{{userBehaviorData}}}
Datos de Rendimiento de Anuncios: {{{adPerformanceData}}}

Basándote en estos datos, proporciona:

1.  **Ubicaciones de Anuncios Recomendadas:** Sugiere las ubicaciones más efectivas dentro del portal cautivo (ej. "Banner principal en la página de conexión", "Anuncio de video post-autenticación", "Pop-up después de 15 minutos de inactividad"). Justifica por qué cada ubicación es valiosa.

2.  **Estrategias de Puja Recomendadas:** Aconseja sobre cómo ajustar las pujas de PPC. Por ejemplo, "Aumentar la puja en un 15% para los anuncios mostrados en la página de conexión, ya que tienen la tasa de conversión más alta" o "Disminuir la puja para los banners en la página de navegación general debido a su bajo CTR".`,
});

const optimizeAdPlacementFlow = ai.defineFlow(
  {
    name: 'optimizeAdPlacementFlow',
    inputSchema: OptimizeAdPlacementInputSchema,
    outputSchema: OptimizeAdPlacementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
