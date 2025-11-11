
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { es } from 'date-fns/locale';
import { format, addMonths } from 'date-fns';
import type { Plan } from '@/lib/types';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { User } from 'firebase/auth';

interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    createdAt: string;
}

interface CurrentUser extends User {
    displayName: string;
}

interface AppContextType {
  currentPlan: Plan;
  setCurrentPlan: (plan: Plan) => void;
  currentUser: CurrentUser | null;
  isLoading: boolean;
}

const initialPlan: Plan = {
    name: 'Plan Profesional',
    price: "€75.00",
    renewalDate: format(addMonths(new Date(), 1), "d 'de' MMMM, yyyy", { locale: es }),
};


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<Plan>(initialPlan);
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const currentUser: CurrentUser | null = useMemo(() => {
    if (!user) return null;
    return {
      ...user,
      displayName: userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Usuario',
    } as CurrentUser;
  }, [user, userProfile]);

  const isLoading = isAuthLoading || (!!user && isProfileLoading);

  return (
    <AppContext.Provider value={{ currentPlan, setCurrentPlan, currentUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
