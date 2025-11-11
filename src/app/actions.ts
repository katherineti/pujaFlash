
'use server';

import { redirect } from 'next/navigation';
import { optimizeAdPlacement } from '@/ai/flows/optimize-ad-placement';
import type { OptimizeAdPlacementOutput } from '@/ai/flows/optimize-ad-placement';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type ActionState = {
  success: boolean;
  message: string;
};


export async function handleLogout() {
  'use server';
  // Note: True sign-out should happen on the client.
  // This server action just redirects the user.
  redirect('/login');
}

export async function handleSignup(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      message: 'El correo electrónico y la contraseña son requeridos.',
    };
  }

  try {
    const { auth, firestore } = initializeFirebase();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.email?.split('@')[0] || 'Nuevo Usuario',
      createdAt: serverTimestamp(),
    };

    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, userProfile, { merge: true });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return {
          success: false,
          message:
            'Este correo electrónico ya está en uso. Por favor, inicia sesión.',
        };
      } else if (error.code === 'auth/weak-password') {
        return {
          success: false,
          message:
            'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.',
        };
      }
    }
    console.error('Signup Error:', error);
    return {
      success: false,
      message: 'Ocurrió un error inesperado al crear la cuenta.',
    };
  }

  redirect('/dashboard');
}


type OptimizerState = OptimizeAdPlacementOutput & {
  error: string | null;
};

const initialState: OptimizerState = {
  recommendedAdPlacements: '',
  recommendedBiddingStrategies: '',
  error: null,
};

export async function runOptimization(
  prevState: OptimizerState,
  formData: FormData
): Promise<OptimizerState> {
  const userBehaviorData = formData.get('userBehaviorData') as string;
  const adPerformanceData = formData.get('adPerformanceData') as string;

  if (!userBehaviorData || !adPerformanceData) {
    return {
      ...initialState,
      error: 'Ambos campos son requeridos.',
    };
  }

  try {
    const result = await optimizeAdPlacement({
      userBehaviorData,
      adPerformanceData,
    });
    return { ...result, error: null };
  } catch (error) {
    console.error(error);
    return {
      ...initialState,
      error:
        'No se pudo ejecutar la optimización. Por favor, inténtalo de nuevo.',
    };
  }
}


export async function updateProfile(formData: FormData) {
  'use server';
  // This action is now a placeholder as updates should be client-driven
  // to ensure correct permissions and immediate UI feedback.
  console.log("Profile update triggered on server, but implementation should be on client.");
}
