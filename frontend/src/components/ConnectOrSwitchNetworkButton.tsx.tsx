'use client'
import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { watchNetwork, getNetwork } from '@wagmi/core'
import { toast } from 'react-toastify'
import { CHAIN_ID, CHAIN_NAME } from '@/config'

const ConnectOrSwitchNetworkButton = () => {
  const [network, setNetwork] = useState(() => getNetwork())
  watchNetwork((network) => setNetwork(network))
  useEffect(() => {
    if (network.chain?.id !== undefined && network.chain?.id !== CHAIN_ID) {
      toast.error(`Please switch to ${CHAIN_NAME}`)
      return
    }
    console.log(network)
  }, [network.chain?.id])

  return network.chain && !network.chain.unsupported ? <ConnectButton /> : <ConnectButton />
}

export default ConnectOrSwitchNetworkButton
