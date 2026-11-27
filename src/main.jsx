import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ==============================================================================
// PWA : enregistrement du service worker (installation sur l'écran d'accueil,
// consultation du catalogue hors ligne et images en cache — la data est chère).
// Désactivé en développement pour ne pas servir de vieux fichiers.
// ==============================================================================
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Le site reste parfaitement fonctionnel sans service worker.
    });
  });
}
