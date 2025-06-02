'use server';

import { signIn } from '@/auth/auth';

export const handleGoogleLogin = async () => {
  'use server';

  await signIn('google');
};
