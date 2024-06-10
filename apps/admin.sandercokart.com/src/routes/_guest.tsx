import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
  beforeLoad: ({ context: { authentication } }) => {
    const { isLogged } = authentication;

    if (isLogged()) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
});
