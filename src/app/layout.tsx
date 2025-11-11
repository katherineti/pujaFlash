import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Pujaflash',
  description: 'Un portal cautivo para la visualización y optimización de anuncios.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2L4 6v2h16V6l-8-4zm4 7h-4v4h4v-4zm-6 0H6v4h4v-4zm-4 5H2v2h4v-2zm6 0h-4v2h4v-2zm8 0h-4v2h4v-2zm-2 3h-4v2h4v-2zm-6 0H6v2h4v-2zm-4 3H2v2h4v-2zm12 0h-4v2h4v-2z'/></svg>" /> */}
        {/* <link rel="icon" href="./../app/favicon.png" /> */}
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
