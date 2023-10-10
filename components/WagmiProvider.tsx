import { sequence } from '0xsequence'
import React from 'react'
import { SequenceConnector } from '@0xsequence/wagmi-connector'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    (chain) => {
      const network = sequence.network.findNetworkConfig(sequence.network.allNetworks, chain.id)
      if (!network) {
        throw new Error(`Could not find network config for chain ${chain.id}`)
      }

      return { chain, rpcUrls: { http: [network.rpcUrl] } }
    }
  ]
)

const connectors = [
  new SequenceConnector({
    chains,
    options: {
      defaultNetwork: 137,
      connect: {
        app: 'Demo',
        walletAppURL: 'https://sequence.app'
      },
    }
  }),
  new MetaMaskConnector({
    chains,
  })
]

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient
})
interface WagmiProviderProps {
  children: React.ReactNode
}

function WagmiProvider({ children }: WagmiProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  );
}

export default WagmiProvider;
