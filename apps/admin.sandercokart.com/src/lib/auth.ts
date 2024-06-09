import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { User } from '@/types/models';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  pages: {
    signIn: '/login',
    // error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) return null;
        const json = (await response.json()) as { user: User; access_token: string };

        if (json.user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: '',
            name: '',
            email: '',
            image: '',
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ], // rest of your config
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
