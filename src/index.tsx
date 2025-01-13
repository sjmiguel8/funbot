import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AmplifyProvider } from './providers/AmplifyProvider';
import '@types/react-dom'; // Adding type declarations for react-dom

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </BrowserRouter>
);