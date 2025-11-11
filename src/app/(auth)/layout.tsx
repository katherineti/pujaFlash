
'use client';

import { FirebaseClientProvider } from '@/firebase';
import { ParticlesBackground } from '@/components/landing/particles-background';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="relative min-h-svh w-full bg-slate-900">
        <ParticlesBackground />
        <div className="relative z-10">{children}</div>
      </div>
    </FirebaseClientProvider>
  );
}
