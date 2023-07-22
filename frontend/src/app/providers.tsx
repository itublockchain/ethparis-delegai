'use client'

import '@rainbow-me/rainbowkit/styles.css'

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { arbitrum, optimism, gnosis, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Slide, ToastContainer } from 'react-toastify'

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, arbitrum, optimism, gnosis], [publicProvider()])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ToastContainer
        position='bottom-center'
        transition={Slide}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='dark'
      />
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#D0CAB9',
          accentColorForeground: 'black',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
