import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioDataProvider>
      <App />
    </PortfolioDataProvider>
  </StrictMode>,
);

