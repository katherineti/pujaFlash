
'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { CheckCircle, Dumbbell, Mail, MessageSquare, Phone, User } from 'lucide-react';
import type { Campaign } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface GymModalProps {
  setDialogOpen: (open: boolean) => void;
  campaign: Campaign;
}

const formSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("El correo electrónico no es válido."),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});


export function GymModal({ campaign, setDialogOpen }: GymModalProps) {
    const { toast } = useToast();
    const { adCreative } = campaign;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "¡Hola! Estoy interesado en la oferta del primer mes gratis. ¿Podrían darme más información?",
        },
    });

    if (!adCreative) return null;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        toast({
            title: "Mensaje enviado con éxito",
            description: "Gracias por tu interés. Un representante de FitLife se pondrá en contacto contigo pronto.",
        });
        setDialogOpen(false);
    }
    
  return (
    <div className="max-h-[90vh] overflow-y-auto">
        <div className="relative">
            <Image 
                src={adCreative.imageUrl}
                alt={adCreative.title}
                width={800}
                height={300}
                className="w-full h-48 object-cover"
                data-ai-hint={adCreative.imageHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
             <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold font-headline">{adCreative.title}</h2>
                <p className="opacity-90">{adCreative.offerTitle}</p>
             </div>
        </div>
      
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                 <div>
                    <h3 className="font-bold text-lg mb-2">Descripción de la Oferta</h3>
                    <p className="text-sm text-muted-foreground">{adCreative.description}</p>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-3">Servicios Incluidos</h3>
                    <ul className="space-y-2 text-sm">
                        {adCreative.services?.map(service => (
                            <li key={service} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-muted-foreground">{service}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-center">¡Solicita más información!</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">Nombre</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Nombre completo" {...field} className="pl-9" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                     <FormLabel className="sr-only">Email</FormLabel>
                                    <FormControl>
                                         <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="email" placeholder="Correo electrónico" {...field} className="pl-9" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                     <FormLabel className="sr-only">Teléfono</FormLabel>
                                    <FormControl>
                                         <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="tel" placeholder="Teléfono (Opcional)" {...field} className="pl-9" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                     <FormLabel className="sr-only">Mensaje</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Textarea placeholder="Mensaje" {...field} className="pl-9" rows={4} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            <Dumbbell className="mr-2 h-4 w-4" />
                            Quiero mi mes gratis
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  );
}
