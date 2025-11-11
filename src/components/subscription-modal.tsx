
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Info, Lock, RefreshCcw, Headphones, Banknote, Landmark, CreditCard, Loader2, Upload, Smartphone, Wallet } from 'lucide-react';
import type { Plan } from '@/lib/types';
import { useState, useRef } from 'react';
import { Label } from './ui/label';
import { CardInfo } from './dashboard/update-payment-method-form';


const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  phone: z.string().min(9, { message: 'Por favor, introduce un número de teléfono válido.' }),
  company: z.string().optional(),
  paymentMethod: z.string({ required_error: 'Debes seleccionar un método de pago.' }),
  terms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones.',
  }),
});

const cardSchema = z.object({
  cardholderName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  cardNumber: z.string().refine(value => /^\d{16}$/.test(value.replace(/\s/g, '')), {
    message: 'El número de tarjeta debe tener 16 dígitos.',
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/, {
    message: 'La fecha debe estar en formato MM/AA.',
  }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'El CVC debe tener 3 o 4 dígitos.' }),
});

const mobilePaymentSchema = z.object({
    phoneNumber: z.string().min(10, { message: 'El número debe tener al menos 10 dígitos.' }),
    bankCode: z.string().min(4, { message: 'El código del banco es requerido.' }),
});


interface SubscriptionModalProps {
  plan: Omit<Plan, 'renewalDate'>;
  setDialogOpen: (open: boolean) => void;
  onSubscriptionComplete?: (plan: Omit<Plan, 'renewalDate'>, paymentMethod: string, paymentDetails?: CardInfo) => void;
  onClosePricingModal?: () => void;
}

export function SubscriptionModal({ plan, setDialogOpen, onSubscriptionComplete, onClosePricingModal }: SubscriptionModalProps) {
  const { toast } = useToast();
  const [view, setView] = useState<'form' | 'bank-transfer' | 'credit-card' | 'mobile-payment' | 'cash'>('form');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '+34 600 123 456',
      company: 'Mi Empresa S.L.',
      paymentMethod: 'credit-card',
      terms: false,
    },
  });

  const cardForm = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    }
  });

  const mobilePaymentForm = useForm<z.infer<typeof mobilePaymentSchema>>({
    resolver: zodResolver(mobilePaymentSchema),
    defaultValues: {
        phoneNumber: '',
        bankCode: '',
    }
  })

  function onPersonalInfoSubmit(values: z.infer<typeof personalInfoSchema>) {
    if (values.paymentMethod === 'bank-transfer') {
        setView('bank-transfer');
    } else if (values.paymentMethod === 'credit-card') {
        setView('credit-card');
        cardForm.setValue('cardholderName', values.fullName);
    } else if (values.paymentMethod === 'mobile-payment') {
        setView('mobile-payment');
    } else if (values.paymentMethod === 'cash') {
        setView('cash');
    }
  }

  function handleSubscription(paymentMethod: string, paymentDetails?: CardInfo) {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        if (onSubscriptionComplete) {
            onSubscriptionComplete(plan, paymentMethod, paymentDetails);
        }
        toast({
          title: '¡Suscripción confirmada!',
          description: `Te has suscrito exitosamente al ${plan.name}.`,
        });
        setDialogOpen(false);
        if (onClosePricingModal) {
          onClosePricingModal();
        }
    }, 1500);
  }

  const handleCardSubmit = (values: z.infer<typeof cardSchema>) => {
    handleSubscription('credit-card', values);
  }

  const handleMobilePaymentSubmit = () => {
    handleSubscription('mobile-payment');
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      toast({
        title: 'Archivo seleccionado',
        description: `Comprobante: ${file.name}`,
      });
    }
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold font-headline">Suscripción a PujaFlash</DialogTitle>
            <DialogDescription>
                {plan.name} - {plan.price}/mes
            </DialogDescription>
        </DialogHeader>
        <div className="p-6">
            {view === 'form' && (
                <Form {...personalInfoForm}>
                    <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                            control={personalInfoForm.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre completo *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={personalInfoForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico *</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={personalInfoForm.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono *</FormLabel>
                                    <FormControl>
                                        <Input type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={personalInfoForm.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Empresa (opcional)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        
                        <FormField
                        control={personalInfoForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Método de pago</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un método de pago" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="credit-card">Tarjeta de crédito</SelectItem>
                                    <SelectItem value="bank-transfer">Transferencia bancaria</SelectItem>
                                    <SelectItem value="mobile-payment">Pago Móvil</SelectItem>
                                    <SelectItem value="cash">Efectivo</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle className="font-bold">Información importante</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                                    <li>Prueba gratuita de 14 días incluida</li>
                                    <li>Configuración e instalación sin costo adicional</li>
                                    <li>Soporte técnico durante la configuración</li>
                                    <li>Puedes cancelar en cualquier momento</li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        <FormField
                            control={personalInfoForm.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    Acepto los términos y condiciones y la política de privacidad
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                            <Button type="submit">Confirmar Suscripción</Button>
                        </div>

                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t">
                            <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Pago seguro SSL</span>
                            <span className="flex items-center gap-1"><Headphones className="h-3 w-3" /> Soporte 24/7</span>
                            <span className="flex items-center gap-1"><RefreshCcw className="h-3 w-3" /> Garantía de devolución</span>
                        </div>
                    </form>
                </Form>
            )}
            {view === 'bank-transfer' && (
                <div className="space-y-6">
                    <Alert>
                        <Landmark className="h-4 w-4" />
                        <AlertTitle className="font-bold">Instrucciones para Transferencia Bancaria</AlertTitle>
                        <AlertDescription>
                            Para completar tu suscripción, por favor realiza una transferencia a la siguiente cuenta y luego haz clic en el botón de confirmación.
                        </AlertDescription>
                    </Alert>

                    <div className="p-4 border rounded-lg bg-muted/50 text-sm space-y-3">
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Banco:</span>
                            <span className="font-mono font-medium">Banco de Venezuela</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Beneficiario:</span>
                            <span className="font-mono font-medium">PujaFlash S.L.</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Nº de Cuenta:</span>
                            <span className="font-mono font-medium">01020552150000012345</span>
                         </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Concepto:</span>
                            <span className="font-mono font-medium">Suscripción {plan.name}</span>
                         </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monto:</span>
                            <span className="font-mono font-medium">{plan.price}</span>
                         </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="receipt">Comprobante de Transferencia</Label>
                        <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" />
                                Adjuntar comprobante
                            </Button>
                             <Input
                                id="receipt"
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,.pdf"
                            />
                            {receiptFile && <span className="text-sm text-muted-foreground truncate">{receiptFile.name}</span>}
                        </div>
                    </div>
                     <Alert variant="destructive">
                        <Banknote className="h-4 w-4" />
                        <AlertTitle>Importante</AlertTitle>
                        <AlertDescription>
                            Tu plan se activará una vez que confirmemos la recepción de la transferencia, lo cual puede tardar hasta 24 horas hábiles.
                        </AlertDescription>
                    </Alert>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
                        <Button variant="outline" onClick={() => setView('form')}>Volver</Button>
                        <Button onClick={() => handleSubscription('bank-transfer')} disabled={!receiptFile || isProcessing}>
                            {isProcessing ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirmando...</>
                            ) : (
                                "He realizado la transferencia"
                            )}
                        </Button>
                    </div>
                </div>
            )}
            {view === 'credit-card' && (
                 <Form {...cardForm}>
                    <form onSubmit={cardForm.handleSubmit(handleCardSubmit)} className="space-y-6">
                        <Alert>
                            <CreditCard className="h-4 w-4" />
                            <AlertTitle className="font-bold">Pago con Tarjeta de Crédito</AlertTitle>
                            <AlertDescription>
                                Completa los datos de tu tarjeta para finalizar la suscripción.
                            </AlertDescription>
                        </Alert>

                        <FormField
                            control={cardForm.control}
                            name="cardholderName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre del titular de la tarjeta</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={cardForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Número de tarjeta</FormLabel>
                                <FormControl>
                                    <Input placeholder="•••• •••• •••• ••••" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-6">
                             <FormField
                                control={cardForm.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Vencimiento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MM / YY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={cardForm.control}
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

                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t">
                            <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Pago seguro encriptado</span>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
                            <Button type="button" variant="outline" onClick={() => setView('form')} disabled={isProcessing}>Volver</Button>
                            <Button type="submit" disabled={isProcessing}>
                                {isProcessing ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</>
                                ) : (
                                    `Pagar ${plan.price}`
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            {view === 'mobile-payment' && (
                <Form {...mobilePaymentForm}>
                    <form onSubmit={mobilePaymentForm.handleSubmit(handleMobilePaymentSubmit)} className="space-y-6">
                        <Alert>
                            <Smartphone className="h-4 w-4" />
                            <AlertTitle className="font-bold">Pago Móvil</AlertTitle>
                            <AlertDescription>
                                Realiza el pago a los siguientes datos y confirma la operación.
                            </AlertDescription>
                        </Alert>

                         <div className="p-4 border rounded-lg bg-muted/50 text-sm space-y-3">
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Banco:</span>
                                <span className="font-mono font-medium">0102 - Banco de Venezuela</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Teléfono:</span>
                                <span className="font-mono font-medium">0412-1234567</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">RIF:</span>
                                <span className="font-mono font-medium">J-123456789</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Monto:</span>
                                <span className="font-mono font-medium">{plan.price}</span>
                             </div>
                        </div>

                        <FormField
                            control={mobilePaymentForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Número de teléfono emisor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tu número de teléfono" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={mobilePaymentForm.control}
                            name="bankCode"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Banco emisor</FormLabel>
                                <FormControl>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tu banco" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0102">Banco de Venezuela</SelectItem>
                                            <SelectItem value="0105">Mercantil</SelectItem>
                                            <SelectItem value="0108">Provincial</SelectItem>
                                            <SelectItem value="0134">Banesco</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
                            <Button type="button" variant="outline" onClick={() => setView('form')} disabled={isProcessing}>Volver</Button>
                            <Button type="submit" disabled={isProcessing}>
                                {isProcessing ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirmando...</>
                                ) : (
                                    `Confirmar Pago`
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            {view === 'cash' && (
                <div className="space-y-6 text-center">
                     <Alert>
                        <Wallet className="h-4 w-4" />
                        <AlertTitle className="font-bold">Pago en Efectivo</AlertTitle>
                        <AlertDescription>
                            Dirígete a una de nuestras sucursales para completar el pago.
                        </AlertDescription>
                    </Alert>
                    <p className="text-sm text-muted-foreground">
                        Para finalizar tu suscripción, por favor visita cualquiera de nuestras sucursales autorizadas y proporciona tu correo electrónico
                        (<span className="font-medium text-foreground">{personalInfoForm.getValues('email')}</span>) como referencia.
                    </p>
                    <p className="font-bold">Monto a pagar: {plan.price}</p>
                     <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2">
                        <Button variant="outline" onClick={() => setView('form')}>Volver</Button>
                        <Button onClick={() => handleSubscription('cash')}>Entendido</Button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
