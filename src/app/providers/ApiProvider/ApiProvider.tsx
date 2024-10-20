import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React, { ReactNode } from 'react';

const queryClient = new QueryClient()


export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}