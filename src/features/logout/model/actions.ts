'use server';

import { cookieOptions } from '@/shared/config';
import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: 'access_token',
    ...cookieOptions,
  });
  cookieStore.delete({
    name: 'refresh_token',
    ...cookieOptions,
  });
}
