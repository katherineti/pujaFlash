
'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, Smartphone, Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UpdatePaymentMethodForm, type CardInfo } from '@/components/dashboard/update-payment-method-form';
import { ChangePlanForm } from '@/components/dashboard/change-plan-form';
import type { Plan } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionModal } from '@/components/subscription-modal';
import { format, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { useApp } from '@/context/app-context';

const initialInvoiceData: {
    invoiceId: string;
    date: string;
    description: string;
    amount: number;
    status: string;
    paymentMethod: string;
}[] = [
  {
    invoiceId: 'INV-2205-005',
    date: '1 de Octubre, 2205',
    description: 'Suscripción Plan Profesional',
    amount: 75.00,
    status: 'Pagado',
    paymentMethod: 'Visa **** 4242',
  },
  {
    invoiceId: 'INV-2205-004',
    date: '1 de Septiembre, 2205',
    description: 'Suscripción Plan Profesional',
    amount: 75.00,
    status: 'Pagado',
    paymentMethod: 'Visa **** 4242',
  },
  {
    invoiceId: 'INV-2205-003',
    date: '1 de Agosto, 2205',
    description: 'Suscripción Plan Profesional',
    amount: 75.00,
    status: 'Pagado',
    paymentMethod: 'Visa **** 4242',
  },
  {
    invoiceId: 'INV-2205-002',
    date: '1 de Julio, 2205',
    description: 'Suscripción Plan Básico',
    amount: 50.00,
    status: 'Pagado',
    paymentMethod: 'Pago Móvil',
  },
  {
    invoiceId: 'INV-2205-001',
    date: '1 de Junio, 2205',
    description: 'Suscripción Plan Básico',
    amount: 50.00,
    status: 'Pagado',
    paymentMethod: 'Efectivo',
  },
];

type Invoice = typeof initialInvoiceData[0];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  'Pagado': 'default',
  'Pendiente': 'secondary',
  'Vencido': 'destructive',
};

const statusColor: { [key: string]: string } = {
    'Pagado': 'bg-green-600',
    'Pendiente': 'bg-yellow-500',
    'Vencido': 'bg-red-700',
}

const initialCard: CardInfo = {
    cardholderName: '',
    cardNumber: '************4242',
    expiryDate: '12/26',
    cvc: '***',
}

export default function FacturacionPage() {
    const { currentPlan, setCurrentPlan } = useApp();
    const [updatePaymentDialogOpen, setUpdatePaymentDialogOpen] = useState(false);
    const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
    const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Omit<Plan, 'renewalDate'>>();
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('0412...789');
    const [cardInfo, setCardInfo] = useState(initialCard);
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const { toast } = useToast();

    const handlePlanChange = (plan: Omit<Plan, 'renewalDate'>) => {
        setChangePlanDialogOpen(false);
        const priceAmount = parseFloat(plan.price.replace('€', '').replace(',', '.'));

        if (priceAmount > 0) {
            setSelectedPlan(plan);
            setSubscriptionDialogOpen(true);
        } else {
            handleSubscriptionComplete(plan, "Gratuito");
            toast({
                title: '¡Plan cambiado!',
                description: `Has cambiado exitosamente al ${plan.name}.`,
            });
        }
    };

    const handleSubscriptionComplete = (newPlan: Omit<Plan, 'renewalDate'>, paymentMethod: string, paymentDetails?: CardInfo) => {
        const nextRenewalDate = addMonths(new Date(), 1);
        setCurrentPlan({
            ...newPlan,
            renewalDate: format(nextRenewalDate, "d 'de' MMMM, yyyy", { locale: es }),
        });

        const priceAmount = parseFloat(newPlan.price.replace('€', '').replace(',', '.'));

        if (priceAmount > 0) {
            const newInvoiceId = `INV-${format(new Date(), 'yyyy-MM')}-${(invoiceData.length + 1).toString().padStart(3, '0')}`;
            
            let paymentMethodDisplay = paymentMethod;

            if (paymentMethod === 'credit-card' && paymentDetails) {
                onCardInfoChange(paymentDetails);
                paymentMethodDisplay = `Visa **** ${paymentDetails.cardNumber.slice(-4)}`;
            } else if (paymentMethod === 'mobile-payment') {
                paymentMethodDisplay = 'Pago Móvil';
            } else if (paymentMethod === 'bank-transfer') {
                paymentMethodDisplay = 'Transferencia';
            }


            const newInvoice: Invoice = {
                invoiceId: newInvoiceId,
                date: format(new Date(), "d 'de' MMMM, yyyy", { locale: es }),
                description: `Suscripción ${newPlan.name}`,
                amount: priceAmount,
                status: 'Pagado',
                paymentMethod: paymentMethodDisplay,
            };
            setInvoiceData(prevInvoices => [newInvoice, ...prevInvoices]);
        }
    };
    
    const onCardInfoChange = (newCardInfo: CardInfo) => {
      setCardInfo(newCardInfo);
    };

    const handleDownloadInvoice = (invoice: Invoice) => {
        const invoiceContent = `
Detalles de la Factura
--------------------------
Nº de Factura: ${invoice.invoiceId}
Fecha: ${invoice.date}
Descripción: ${invoice.description}
Método de Pago: ${invoice.paymentMethod}
Monto: $${invoice.amount.toFixed(2)}
Estado: ${invoice.status}

Detalles del Cliente:
Usuario de Ejemplo
usuario@ejemplo.com

Gracias por su pago.
        `.trim();

        const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${invoice.invoiceId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
            title: 'Factura Descargada',
            description: `La factura ${invoice.invoiceId} ha comenzado a descargarse.`,
        });
    }

  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader title="Facturación" />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Historial de Facturas</CardTitle>
                <CardDescription>Revisa tus transacciones y descarga tus facturas.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nº de Factura</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Método de Pago</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceData.map((invoice) => (
                      <TableRow key={invoice.invoiceId}>
                        <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[invoice.status]} className={statusColor[invoice.status]}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="icon" onClick={() => handleDownloadInvoice(invoice)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar Factura</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-4 auto-rows-max">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Plan Actual</CardTitle>
                <CardDescription>Tu suscripción activa.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{currentPlan.name}</p>
                  <p className="text-muted-foreground">{currentPlan.price} / mes</p>
                  <p className="text-sm text-muted-foreground pt-2">
                    Tu plan se renueva el {currentPlan.renewalDate}.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={changePlanDialogOpen} onOpenChange={setChangePlanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Cambiar de Plan</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                          <DialogTitle className="font-headline">Cambiar de Plan de Suscripción</DialogTitle>
                          <DialogDescription>
                              Elige el plan que mejor se adapte a tus necesidades.
                          </DialogDescription>
                      </DialogHeader>
                      <ChangePlanForm 
                        currentPlanName={currentPlan.name}
                        onPlanChange={handlePlanChange}
                       />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Métodos de Pago</CardTitle>
                <CardDescription>Las opciones guardadas para tus pagos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visa terminada en {cardInfo.cardNumber.slice(-4)}</p>
                    <p className="text-sm text-muted-foreground">Expira {cardInfo.expiryDate}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                  <Smartphone className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pago Móvil</p>
                    <p className="text-sm text-muted-foreground">{mobilePhoneNumber}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Efectivo</p>
                    <p className="text-sm text-muted-foreground">Pago en sucursal</p>
                  </div>
                </div>
              </CardContent>
               <CardFooter>
                <Dialog open={updatePaymentDialogOpen} onOpenChange={setUpdatePaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Actualizar Métodos de Pago</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                     <DialogHeader>
                        <DialogTitle className="font-headline">Actualizar Método de Pago</DialogTitle>
                        <DialogDescription>
                            Elige tu método de pago preferido.
                        </DialogDescription>
                    </DialogHeader>
                    <UpdatePaymentMethodForm 
                      setDialogOpen={setUpdatePaymentDialogOpen} 
                      currentPhoneNumber={mobilePhoneNumber}
                      onPhoneNumberChange={setMobilePhoneNumber}
                      currentCardInfo={cardInfo}
                      onCardInfoChange={onCardInfoChange}
                    />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
          <DialogContent className="sm:max-w-2xl p-0">
              {selectedPlan && (
                <SubscriptionModal 
                    plan={selectedPlan} 
                    setDialogOpen={setSubscriptionDialogOpen} 
                    onSubscriptionComplete={handleSubscriptionComplete}
                />
              )}
          </DialogContent>
      </Dialog>
    </div>
  );
}
