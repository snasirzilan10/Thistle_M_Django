import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// Top 0.01% professional QueryClient config (used by FAANG e-commerce teams)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                    // Only retry once on network failure
      staleTime: 5 * 60 * 1000,   // 5 minutes — reduces unnecessary API calls
      refetchOnWindowFocus: false, // Prevents annoying refetches when switching tabs
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);