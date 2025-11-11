'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { es } from 'date-fns/locale';

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'El nombre de la campaña debe tener al menos 5 caracteres.',
  }),
  budget: z.coerce
    .number()
    .positive({ message: 'El presupuesto debe ser un número positivo.' }),
  endDate: z.date({
    required_error: 'Se requiere una fecha de finalización.',
  }),
});

export type NewCampaign = z.infer<typeof formSchema>;

interface CreateCampaignFormProps {
  setDialogOpen: (open: boolean) => void;
  onCampaignCreate: (campaign: NewCampaign) => void;
}


export function CreateCampaignForm({ setDialogOpen, onCampaignCreate }: CreateCampaignFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      budget: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCampaignCreate(values);
    toast({
      title: 'Campaña Creada Exitosamente',
      description: `La campaña "${values.name}" ha sido creada con un presupuesto de $${values.budget}.`,
    });
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Campaña</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Oferta de Verano" {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre público de tu campaña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presupuesto</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ej: 5000" {...field} />
              </FormControl>
              <FormDescription>
                El presupuesto total para esta campaña en USD.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Finalización</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                La campaña se detendrá automáticamente en esta fecha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button type="submit">Crear Campaña</Button>
        </div>
      </form>
    </Form>
  );
}
