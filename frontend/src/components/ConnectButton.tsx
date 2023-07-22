'use client'
import { useConnect } from 'wagmi'

export default function ConnectButton() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  return (
    <div className='flex items-center justify-center p-4'>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className='w-[256px] h-[48px] bg-[#8BA99A] rounded-md'
        >
          <span className='bg-[#F6F2E7]'>
            {' '}
            {!isLoading && 'Connect Wallet'}
            {isLoading && connector.id === pendingConnector?.id && 'Connecting'}
          </span>
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
