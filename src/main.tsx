import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import 'swiper/swiper-bundle.css';
import App from './App.tsx';
import { AppWrapper } from './components/common/PageMeta.tsx';
import { SidebarProvider } from './components/sidebar/context.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <AppWrapper>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </AppWrapper>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
