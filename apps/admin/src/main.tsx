import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import React from 'react';

import { GlobalProviders } from '@/components/global-providers.tsx';

import { useAuth } from '@/lib/auth.tsx';
import { router } from '@/router.tsx';

import 'unfonts.css';
import './App.css';

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider context={{ auth }} router={router} />;
}

function App() {
  return (
    <GlobalProviders>
      <InnerApp />
    </GlobalProviders>
  );
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
