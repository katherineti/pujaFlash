
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, TriangleAlert } from 'lucide-react';
import { handleSignup } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      disabled={disabled || pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Creando cuenta...' : 'Crear cuenta'}
    </Button>
  );
}

export function SignupForm() {
  const [state, formAction] = useActionState(handleSignup, initialState);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <form action={formAction} className="grid gap-4">
      {state && !state.success && state.message && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error de Registro</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="usuario@ejemplo.com"
          required
          className="bg-background"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className="bg-background"
        />
      </div>
      <div className="mt-2 flex items-start space-x-2">
        <Checkbox
          id="terms"
          name="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acepto los términos y condiciones
        </label>
      </div>
      <SubmitButton disabled={!termsAccepted} />
    </form>
  );
}
