import useSWR from 'swr';

import { createContext, useCallback, useContext } from 'react';

import type { ReactNode } from 'react';
import type { User } from '@/types/models.ts';

import { api } from '@/lib/api.ts';

export class ValidationError<T> extends Error {
  public errors: T;

  constructor(errors: T) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

interface CredentialsErrorDetail {
  email: string;
  password: string;
}

export class CredentialsError extends ValidationError<CredentialsErrorDetail> {
  constructor(errors: CredentialsErrorDetail) {
    super(errors);
    this.name = 'CredentialsError';
  }
}

export interface AuthContext {
  /** Whether the current user is authenticated. */
  isAuthenticated: boolean;
  /**
   * Sign in with the provided credentials.
   *
   */
  signIn: (credentials: Credentials) => Promise<void | Record<'email' | 'password', string>>;
  /** Sign out the current user. */
  signOut: () => Promise<void>;
  /** The current user. */
  user: User | null;
}

interface Credentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user = null, mutate } = useSWR<User>(
    '/user',
    async (args: any) => await api.get<User>(args).then(res => res.data),
    { suspense: true },
  );
  const isAuthenticated = !!user;

  const csrf = () => api.get('/sanctum/csrf-cookie');

  const signOut = useCallback(async () => {
    await api.post('/logout').then(() => {
      mutate();
    });
  }, []);

  const signIn = useCallback(async (credentials: Credentials) => {
    await csrf();

    await api
      .post<Record<'email' | 'password', string>>('/login', credentials)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error;

        throw new CredentialsError(error.response.data.errors);
      });
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
