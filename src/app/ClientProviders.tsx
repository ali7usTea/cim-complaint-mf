'use client';

import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { Providers } from '../redux/provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from '../providers/AuthProvider';
import { Suspense } from 'react';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            retryOnMount: false,
            refetchOnWindowFocus: false
        }
    }
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <PrimeReactProvider>
                <Providers>
                    <LayoutProvider>
                        <AuthProvider enabled={false} />
                        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                    </LayoutProvider>
                </Providers>
            </PrimeReactProvider>
        </Suspense>
    );
}
