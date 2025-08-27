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

// Debug-only visual error overlay (remove in production)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).onerror = function(message: any, source: any, lineno: any, colno: any, error: any) {
    const div = document.createElement("div");
    div.style.cssText = "background:black; color:red; padding:10px; font-size:14px; white-space:pre-wrap;";
    div.innerText = `❌ ERROR: ${message}\nSOURCE: ${source}\nLINE: ${lineno}:${colno}`;
    document.body.innerHTML = "";
    document.body.appendChild(div);
  };

  (window as any).onunhandledrejection = function(event: any) {
    const div = document.createElement("div");
    div.style.cssText = "background:black; color:red; padding:10px; font-size:14px; white-space:pre-wrap;";
    div.innerText = `❌ UNHANDLED PROMISE REJECTION: ${event.reason}`;
    document.body.innerHTML = "";
    document.body.appendChild(div);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
