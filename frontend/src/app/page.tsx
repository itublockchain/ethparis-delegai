'use client'

import { useEffect } from 'react'
import { useConnect } from 'wagmi'
import NounsOne from '../../public/body1.svg'
import NounsTwo from '../../public/body2.svg'
import NounsThree from '../../public/body3.svg'
import { Dashboard } from '@/components'
import Image from 'next/image'

type Item = {
  name: string
  proposals: number
  holders: number
  voters: number
}

const items: Item[] = [
  {
    name: "Gnosis DAO",
    proposals: 227,
    holders: 27302,
    voters: 15782
  },
  {
    name: "Nouns DAO",
    proposals: 227,
    holders: 27302,
    voters: 15782
  },
  {
    name: "Arbitrum",
    proposals: 227,
    holders: 27302,
    voters: 15782
  },
  {
    name: "Optimism",
    proposals: 227,
    holders: 27302,
    voters: 15782
  },
  {
    name: "Aave",
    proposals: 227,
    holders: 27302,
    voters: 15782
  }
]

export default function Home() {
  return (
    <main className='bg-[#D0CAB9] h-screen flex flex-col items-start px-20 py-20 w-screen justify-center overflow-hidden'>
      <div className='flex justify-between items-end w-full h-40 -mb-6'>
        <Image src={NounsOne} alt='nouns-1' className='w-40' />
        <Image src={NounsThree} alt='nouns-3' className='w-40' />
        <Image src={NounsTwo} alt='nouns-2' className='w-40' />
      </div>
      <Dashboard items={items} />
    </main>
  )
}
