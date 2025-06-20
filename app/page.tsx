import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { recentSessions } from '@/constants'
import { getAllCompanions, recentSession } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page = async () => {

  const companions = await getAllCompanions({ limit: 3 })
  const recentCompanionSession = await recentSession(10)



  return (
    <main>
      <h1 className='tracking-tight px-4 md:p-0'>
        Popular Companions
      </h1>

      <section className='home-section'>
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}


      </section>

      <section className='home-section'>
        <CompanionList
          title="Recently completed sessions"
          companions={recentCompanionSession}
          className="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>

    </main>
  )
}

export default Page