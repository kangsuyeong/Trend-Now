import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User & DefaultSession['User'];
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: 'RefreshTokenError';
  }

  interface User {
    id?: string;
    name?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: 'RefreshTokenError';
  }
}
