'use client'

import { useEffect } from 'react'
import { useConnect } from 'wagmi'

export default function Home() {
  const { connect, connectors, error, isLoading } = useConnect()
  useEffect(() => {}, [])
  return <main className='bg-[#D0CsAB9] h-screen'></main>
}
