import ReactDOM from 'react-dom/client';

import { StrictMode } from 'react';

import './App.css';
import 'unfonts.css';

import { App } from '@/app.tsx';

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
