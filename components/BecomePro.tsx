import { auth } from '@clerk/nextjs/server'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BecomePro = async () => {
    const { has } = await auth()
    const hasPro = has({ plan: 'pro_learner' })

    if (!hasPro)
        return (
            <Link
                href="/subscription"
                className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary hover:text-primary md:inline-flex"
            >
                <Sparkles className="size-3.5" />
                Become a Pro
            </Link>
        )

    return (
        <Link
            href="/companions/new"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary hover:text-primary md:inline-flex"
        >
            <Sparkles className="size-3.5" />
            New Companion
        </Link>
    )
}

export default BecomePro
