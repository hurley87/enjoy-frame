import { createConfig, http, WagmiProvider } from 'wagmi';
import { zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { frameConnector } from '@/lib/connector';

export const config = createConfig({
  chains: [zora],
  transports: {
    [zora.id]: http('https://rpc.zora.energy'),
  },
  connectors: [frameConnector()],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
