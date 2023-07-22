'use client'

import '@rainbow-me/rainbowkit/styles.css'

import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { arbitrum, optimism, gnosis, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Slide, ToastContainer } from 'react-toastify'

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, arbitrum, optimism, gnosis], [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '68da90dc048d016fd402ec20b134a8d0',
  chains
});
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* <ToastContainer
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
      /> */}
      <RainbowKitProvider
      coolMode={true}
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
