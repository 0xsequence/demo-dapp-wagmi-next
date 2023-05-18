import React from 'react'
import { SequenceConnector } from '@0xsequence/wagmi-connector'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
  ],
  [
    publicProvider(),
  ]
);

const connectors = [
  new SequenceConnector({
    chains,
    options: {
      connect: {
        app: 'Demo',
        networkId: 137
      }
    }
  }),
]

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

interface WagmiProviderProps {
  children: React.ReactNode
}

function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      {children}
    </WagmiConfig>
  );
}

export default WagmiProvider;
