import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const SubscriptionPage = () => {
  return (
    <main className='flex items-center justify-center p-8'>
      <PricingTable />
      <p className='text-gray-600'>
        We are most value-for-money solution you can get in the market.
      </p>
    </main>
  )
}

export default SubscriptionPage