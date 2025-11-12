
import { Logo } from '../logo';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Pujaflash</span>
        </div>
        <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pujaflash. Todos los derechos reservados | Desarrollado por Katherine Gutiérrez
        </p>
      </div>
    </footer>
  );
}
