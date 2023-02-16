import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Converter from './Converter';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Converter />
    </QueryClientProvider>
  );
}
