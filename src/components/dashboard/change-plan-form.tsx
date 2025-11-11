'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Plan } from '@/lib/types';
import { Check } from 'lucide-react';

const plans: Omit<Plan, 'renewalDate'>[] = [
    { 
        name: 'Plan Gratuito', 
        price: "€0.00", 
        features: [
            '1 campaña activa',
            '1000 impresiones/mes',
            'Analíticas básicas',
            'Soporte comunitario',
        ]
    },
    { 
        name: 'Plan Básico', 
        price: "€25.00", 
        features: [
            '5 campañas activas',
            '10,000 impresiones/mes',
            'Analíticas detalladas',
            'Soporte por email',
        ]
    },
    { 
        name: 'Plan Profesional', 
        price: "€75.00",
        features: [
            'Campañas ilimitadas',
            '100,000 impresiones/mes',
            'Optimización con IA',
            'Soporte prioritario',
        ]
    },
    { 
        name: 'Plan Empresarial', 
        price: "€200.00",
        features: [
            'Todo lo del plan Profesional',
            'Impresiones sin límites',
            'Manager de cuenta dedicado',
            'SLA garantizado',
        ]
    },
];

const formSchema = z.object({
  planName: z.string({
    required_error: 'Debes seleccionar un plan.',
  }),
});

interface ChangePlanFormProps {
  currentPlanName: string;
  onPlanChange: (plan: Omit<Plan, 'renewalDate'>) => void;
}

export function ChangePlanForm({ currentPlanName, onPlanChange }: ChangePlanFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: currentPlanName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedPlan = plans.find(p => p.name === values.planName);
    if (selectedPlan) {
        onPlanChange(selectedPlan);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="planName"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                    {plans.map((plan) => (
                        <FormItem key={plan.name} className="rounded-md border p-4 hover:bg-accent/50 has-[:checked]:bg-accent/80 has-[:checked]:border-primary">
                             <div className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={plan.name} />
                                </FormControl>
                                <FormLabel className="font-normal w-full cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">{plan.name}</span>
                                        <span className="font-bold">{plan.price}/mes</span>
                                    </div>
                                </FormLabel>
                            </div>
                            {plan.features && (
                                <ul className="mt-3 ml-7 space-y-2 text-xs text-muted-foreground">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-3 w-3 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </FormItem>
                    ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="submit">Continuar</Button>
        </div>
      </form>
    </Form>
  );
}
