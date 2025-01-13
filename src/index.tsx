import React from 'react';
import ReactDOM from 'react-dom/client';
import { AmplifyProvider } from './providers/AmplifyProvider';
import '@types/react-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AmplifyProvider>
    <div id="app" />
  </AmplifyProvider>
);