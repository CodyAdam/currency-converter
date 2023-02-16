import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Converter from './Converter';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Converter />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
