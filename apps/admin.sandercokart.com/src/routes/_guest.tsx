import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <div>Hello /_guest!</div>,
});
