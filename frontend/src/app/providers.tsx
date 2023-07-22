'use client'

import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { arbitrum, optimism, gnosis, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, arbitrum, optimism, gnosis], [publicProvider()])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children} </WagmiConfig>
}
