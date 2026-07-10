import { PricingTable } from '@clerk/nextjs'
import { Infinity as InfinityIcon, Snail, Waves, Headphones } from 'lucide-react'
import React from 'react'

const perks = [
  {
    icon: InfinityIcon,
    title: 'Unlimited companions',
    body: 'Create as many voice tutors as you like — one for every subject and mood.',
  },
  {
    icon: Waves,
    title: 'Natural voice sessions',
    body: 'Low-latency, lifelike conversations that adapt to your pace and style.',
  },
  {
    icon: Headphones,
    title: 'Priority access',
    body: 'Faster models and first dibs on new voices, subjects and features.',
  },
]

const SubscriptionPage = () => {
  return (
    <main className="max-w-5xl">
      <section className="flex flex-col items-center gap-4 text-center animate-rise">
        <span className="inline-flex items-center gap-1.5    bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground shadow-[var(--shadow-xs)]">
          Pricing
        </span>
        <h1 className="max-w-2xl">Learn without limits</h1>
        <p className="max-w-lg text-base text-muted-foreground">
          The best value-for-money way to learn. Upgrade to create more companions
          and unlock premium features — cancel anytime.
        </p>
      </section>

      {/* Value props */}
      <section className="grid gap-4 animate-rise sm:grid-cols-3">
        {perks.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
              <Icon className="size-5" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold tracking-[-0.01em]">{title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Plans */}
      <section className="relative animate-rise">
        {/* soft ambient glow behind the plans */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-40 max-w-2xl rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, color-mix(in oklch, var(--primary) 22%, transparent), transparent)' }}
        />
        <div className="relative rounded-3xl border border-border bg-surface p-4 shadow-[var(--shadow-sm)] sm:p-8">
          <PricingTable />
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground/70 animate-fade">
        Secure billing handled by Clerk · Prices in USD · Taxes may apply
      </p>
    </main>
  )
}

export default SubscriptionPage
