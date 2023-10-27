import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './AppComponent.tsx';
import './index.css';
import { WebSocketProvider, socket } from './shared/context/web-socket-context/web-socket-context.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WebSocketProvider value={socket}>
      <App />
    </WebSocketProvider>
  </React.StrictMode>,
);