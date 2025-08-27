import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error logging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    try {
      console.log('Global error:', {
        message: event?.error?.message || event?.message,
        stack: event?.error?.stack,
        filename: event?.filename,
        lineno: event?.lineno,
        colno: event?.colno,
      });
    } catch {}
  });

  window.addEventListener('unhandledrejection', (event) => {
    try {
      console.log('Unhandled promise rejection:', {
        reason: (event as any)?.reason,
      });
    } catch {}
  });
}

createRoot(document.getElementById("root")!).render(<App />);
