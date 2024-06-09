import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const navigate = useNavigate();

  const signIn = () => {
    localStorage.setItem('isAuthenticated', 'true');
    void navigate({ to: '/dashboard' });
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
    void navigate({ to: '/login' });
  };

  const isLogged = (): boolean => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;
