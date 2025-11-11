
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface CardInfo {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
}

const cardSchema = z.object({
  paymentMethod: z.literal('card'),
  cardNumber: z.string().regex(/^(\d{16}|\*{12}\d{4})$/, {
    message: 'El número de tarjeta debe tener 16 dígitos.',
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'La fecha debe estar en formato MM/AA.',
  }),
  cvc: z.string().regex(/^\d{3,4}$|^\*{3}$/, {
    message: 'El CVC debe tener 3 o 4 dígitos.',
  }),
  cardholderName: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
});

const mobileSchema = z.object({
    paymentMethod: z.literal('mobile'),
    phoneNumber: z.string().regex(/^\d{10,15}$/, {
        message: 'El número de teléfono debe tener entre 10 y 15 dígitos.',
    }),
});

const cashSchema = z.object({
    paymentMethod: z.literal('cash'),
});

const formSchema = z.discriminatedUnion('paymentMethod', [cardSchema, mobileSchema, cashSchema]);

interface UpdatePaymentMethodFormProps {
  setDialogOpen: (open: boolean) => void;
  currentPhoneNumber: string;
  onPhoneNumberChange: (newNumber: string) => void;
  currentCardInfo: CardInfo;
  onCardInfoChange: (newCardInfo: CardInfo) => void;
}

export function UpdatePaymentMethodForm({ 
    setDialogOpen, 
    currentPhoneNumber, 
    onPhoneNumberChange,
    currentCardInfo,
    onCardInfoChange
}: UpdatePaymentMethodFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        paymentMethod: 'card',
        cardholderName: currentCardInfo.cardholderName,
        cardNumber: currentCardInfo.cardNumber,
        expiryDate: currentCardInfo.expiryDate,
        cvc: currentCardInfo.cvc,
        phoneNumber: currentPhoneNumber.includes('...') ? '' : currentPhoneNumber,
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  function onSubmit(values: z.infer<typeof formSchema>) {
    let description = '';
    if (values.paymentMethod === 'card') {
        const newCardInfo = {
            cardholderName: values.cardholderName,
            cardNumber: values.cardNumber,
            expiryDate: values.expiryDate,
            cvc: values.cvc
        };
        onCardInfoChange(newCardInfo);
        description = `Tu nueva tarjeta terminada en ${values.cardNumber.slice(-4)} ha sido guardada.`
    } else if (values.paymentMethod === 'mobile') {
        onPhoneNumberChange(values.phoneNumber);
        description = `Tu método de pago móvil con el número ${values.phoneNumber} ha sido guardado.`
    } else if (values.paymentMethod === 'cash') {
        description = 'Has seleccionado el pago en efectivo. Por favor, sigue las instrucciones.'
    }

    toast({
      title: 'Método de Pago Actualizado',
      description,
    });
    setDialogOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Tabs 
            defaultValue="card" 
            className="w-full" 
            onValueChange={(value) => form.setValue('paymentMethod', value as 'card' | 'mobile' | 'cash')}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">
                <CreditCard className="mr-2 h-4 w-4" />
                Tarjeta
            </TabsTrigger>
            <TabsTrigger value="mobile">
                <Smartphone className="mr-2 h-4 w-4" />
                Pago Móvil
            </TabsTrigger>
            <TabsTrigger value="cash">
                <Wallet className="mr-2 h-4 w-4" />
                Efectivo
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Titular</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Tarjeta</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Input placeholder="•••• •••• •••• ••••" {...field} />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Fecha de Vencimiento</FormLabel>
                    <FormControl>
                        <Input placeholder="MM/AA" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                        <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </TabsContent>
          <TabsContent value="mobile" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="04123456789" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="cash" className="space-y-4 pt-4">
              <div className="text-sm text-center text-muted-foreground p-4 border rounded-md bg-secondary/50">
                <p>Para completar tu pago en efectivo, por favor dirígete a una de nuestras sucursales autorizadas.</p>
                <p className="mt-2 font-semibold">Recuerda llevar tu número de referencia.</p>
              </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button type="submit">
                {paymentMethod === 'cash' ? 'Confirmar Selección' : 'Guardar Método'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
