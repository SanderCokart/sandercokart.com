import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context: { authentication } }) => {
    const { isLogged } = authentication;

    if (!isLogged()) {
      throw redirect({
        to: '/login',
      });
    }
  },
});
