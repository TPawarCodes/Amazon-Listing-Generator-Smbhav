import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to initialize application:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>Application Error</h1>
      <p>Failed to initialize the application. Please check the console for details.</p>
    </div>
  `;
}