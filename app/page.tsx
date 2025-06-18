import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='tracking-tight px-4 md:p-0'>
        Popular Companions
      </h1>

      <section className='home-section'>
        <CompanionCard
          id="123"
          name="Dora the explorer"
          topic="adventure"
          subject="science"
          duration={45}
          color="#ffed66"
        />

        <CompanionCard
          id="124"
          name="Abacus the master"
          topic=" abdacadabra"
          subject="magic"
          duration={15}
          color="#20a4f3"
        />

        <CompanionCard
          id="125"
          name="Darwin The Sailor"
          topic="finding about the biology of env files"
          subject="biology"
          duration={75}
          color="#06d6a0"
        />

      </section>

      <section className='home-section'>
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessions}
          className="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>

    </main>
  )
}

export default Page