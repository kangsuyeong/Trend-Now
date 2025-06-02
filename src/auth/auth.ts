import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent', // 사용자에게 항상 동의 화면을 표시하도록 강제!
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials, profile }) {
      console.log('user', user);
      console.log('account', account);
      console.log('credentials', credentials);
      console.log('profile', profile);
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('token', token);
      console.log('user', user);
      console.log('account', account);

      return token;
    },
  },
});
