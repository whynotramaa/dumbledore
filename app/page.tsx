import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <>
      <h1 className='tracking-tight text-green-700'>
        Dumbledore is here to <span className='text-red-600 italic'>teach</span>
      </h1>
      <Button>
        Lets Get Started
      </Button>
    </>
  )
}

export default Page