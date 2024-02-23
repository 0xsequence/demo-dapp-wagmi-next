import { sequence } from '0xsequence'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sequenceWallet } from '@0xsequence/wagmi-connector'
import { createConfig, WagmiProvider as WagmiWrapper } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, Chain } from 'wagmi/chains';
import { http } from 'viem'

const queryClient = new QueryClient() 

const chains = [mainnet, polygon, optimism, arbitrum ] as [Chain, ...Chain[]]

const connectors = [
  sequenceWallet({
    defaultNetwork: 137,
    projectAccessKey: 'iK0DPkHRt0IFo8o4M3fZIIOAAAAAAAAAA',
    connect: {
      app: 'Demo',
      walletAppURL: 'https://sequence.app'
    },
  }),
]

interface WagmiProviderProps {
  children: React.ReactNode
}

function WagmiProvider({ children }: WagmiProviderProps) {
  const transports: any = {}

  chains.forEach(chain => {
    const network = sequence.network.findNetworkConfig(sequence.network.allNetworks, chain.id)
    if (!network) return
    transports[chain.id] = http(network.rpcUrl)
  })

  const wagmiConfig = createConfig({
    chains,
    connectors,
    transports,
  })

  return (
    <WagmiWrapper config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiWrapper>
  );
}

export default WagmiProvider;
