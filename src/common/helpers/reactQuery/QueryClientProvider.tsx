import React from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';


export interface ProcurementQueryClientProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: ProcurementQueryClientProviderProps) {
    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    );
}
