

'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateProfile } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/app-context';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'La contraseña actual es requerida.'),
    newPassword: z
      .string()
      .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las nuevas contraseñas no coinciden.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'La nueva contraseña no puede ser igual a la contraseña actual.',
    path: ['newPassword'],
  });

export default function ConfiguracionPage() {
  const { currentUser, isLoading } = useApp();
  const auth = useAuth(); // Get the auth instance
  const { toast } = useToast();
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleProfileUpdate = async (formData: FormData) => {
    // This is just a placeholder action. In a real scenario, you'd use the user's UID.
    // However, client-side updates are preferred for Firestore security rules.
    // For this example, we just show a toast.
    await updateProfile(formData);
    toast({
      title: 'Perfil Actualizado',
      description: 'Tu nombre ha sido actualizado exitosamente.',
    });
  };

  const handleChangePassword = async (values: z.infer<typeof passwordSchema>) => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se ha encontrado un usuario autenticado.',
      });
      return;
    }
    
    if (!firebaseUser.email) {
      toast({
        variant: 'destructive',
        title: 'Error de Cuenta',
        description: 'No se ha encontrado un correo electrónico para esta cuenta. Contacta a soporte.',
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const credential = EmailAuthProvider.credential(
        firebaseUser.email,
        values.currentPassword
      );

      // Re-authenticate the user
      await reauthenticateWithCredential(firebaseUser, credential);

      // If re-authentication is successful, update the password
      await updatePassword(firebaseUser, values.newPassword);

      toast({
        title: 'Contraseña Actualizada',
        description: 'Tu contraseña ha sido cambiada exitosamente.',
      });
      passwordForm.reset();
    } catch (error) {
      let errorMessage = 'Ocurrió un error inesperado.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'La contraseña actual es incorrecta.';
            break;
          case 'auth/weak-password':
            errorMessage =
              'La nueva contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
            break;
          default:
            errorMessage = 'No se pudo actualizar la contraseña. Inténtalo de nuevo.';
        }
      }
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: errorMessage,
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const displayName = currentUser?.displayName || '';
  const email = currentUser?.email || 'cargando...';

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
        <DashboardHeader title="Configuración" />
        <main className="grid flex-1 items-start gap-4 md:gap-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 bg-background p-4 sm:p-6 md:gap-8">
      <DashboardHeader title="Configuración" />
      <main className="grid flex-1 items-start gap-4 md:gap-8">
        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[500px]">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="contrasena">Contraseña</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Perfil de Usuario
                </CardTitle>
                <CardDescription>
                  Actualiza la información de tu perfil aquí.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      key={displayName} // Use key to force re-render on change
                      defaultValue={displayName}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={email}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      No puedes cambiar tu correo electrónico.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contrasena">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Cambiar Contraseña
                </CardTitle>
                <CardDescription>
                  Actualiza la contraseña de tu cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handleChangePassword)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña Actual</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isUpdatingPassword}>
                      {isUpdatingPassword && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Actualizar Contraseña
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notificaciones">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Preferencias de Notificación
                </CardTitle>
                <CardDescription>
                  Gestiona cómo te comunicamos las novedades.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Notificaciones por Correo
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe correos sobre la actividad de tu cuenta y
                      actualizaciones de productos.
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    aria-label="Notificaciones por correo"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base">
                      Notificaciones Push
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones push en tus dispositivos sobre
                      actualizaciones importantes.
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    aria-label="Notificaciones push"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails" className="text-base">
                      Correos de Marketing
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe correos sobre nuevas funciones, ofertas especiales y
                      más.
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    aria-label="Correos de marketing"
                    defaultChecked
                  />
                </div>
                <Button>Guardar Preferencias</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
