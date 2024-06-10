import useSWR from 'swr';

import { createContext } from 'react';

import type { ReactNode } from 'react';
import type { User } from '@/types/models.ts';

import { api } from '@/lib/api.ts';

interface Credentials {
  email: string;
  password: string;
}

export type AuthContextType = {
  signIn: (credentials: Credentials) => Promise<void | Record<'email' | 'password', string>>;
  signOut: () => Promise<void>;
  isLogged: () => boolean;
  user?: User;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    mutate,
    error,
  } = useSWR<User>('/user', async () => await api.get<User>('/user').then(res => res.data));
  if (error) console.error('/user', error);

  const csrf = () => api.get('/sanctum/csrf-cookie');

  const signIn = async (credentials: Credentials) => {
    await csrf();

    const validationErrors = await api
      .post('/login', credentials)
      .then(() => {
        mutate();
      })
      .catch(error => {
        if (error.response.status !== 422) throw error;

        return error.response.data.errors;
      });

    if (validationErrors) return validationErrors as Record<'email' | 'password', string>;
  };

  const signOut = async () => {
    await api.post('/logout').then(() => {
      mutate();
    });
  };

  const isLogged = (): boolean => {
    return !!user;
  };

  const value = { signIn, signOut, isLogged, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
