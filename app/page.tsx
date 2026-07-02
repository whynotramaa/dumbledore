import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cta from '@/components/Cta'
import { getAllCompanions, recentSession } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page = async () => {

  const companions = await getAllCompanions({ limit: 3 })
  const recentCompanionSession = await recentSession(10)

  return (
    <main>
      <section className="flex flex-col gap-3 animate-rise">
        <span className="eyebrow">Dumbledore AI</span>
        <h1 className="max-w-2xl">
          Learn anything through natural conversation.
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          Pick a companion, start a session, and let a voice tutor guide you — at your pace, in your style.
        </p>
      </section>

      <section className="flex flex-col gap-5 animate-rise">
        <div className="flex items-end justify-between">
          <h2>Popular companions</h2>
        </div>
        <div className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </div>
      </section>

      <section className="home-section animate-rise">
        <CompanionList
          title="Recently completed sessions"
          companions={recentCompanionSession}
          className="w-full lg:w-2/3"
        />
        <Cta />
      </section>
    </main>
  )
}

export default Page
