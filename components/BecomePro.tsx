import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const BecomePro = async () => {

    const { has } = await auth()
    const hasPro = has({ plan: 'pro_learner' })

    if (!hasPro) return (
        <div>
            <Link href='/subscription' className="border max-md:hidden transition-all duration-300 py-2 px-4 rounded-lg hover:font-bold hover:bg-primary hover:text-white">
                Become a Pro
            </Link>
        </div>
    )

    return (
        <Link href='/companions/new' className="border max-md:hidden transition-all duration-300 py-2 px-4 rounded-lg hover:font-bold hover:bg-primary hover:text-white">
            Make a new Companion
        </Link>
    )
}

export default BecomePro