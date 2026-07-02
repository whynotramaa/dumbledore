import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cta = () => {
    return (
        <section className="flex w-full flex-col gap-6 rounded-2xl bg-cta p-8 text-white shadow-[var(--shadow-md)] lg:w-1/3">
            <span className="w-fit rounded-full bg-cta-gold px-3 py-1 text-xs font-semibold text-black">
                Start learning your way
            </span>

            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-white">
                    Build your own learning companion
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                    Pick a name, subject, voice & personality — and learn through conversations that feel natural.
                </p>
            </div>

            <div className="flex items-center justify-center py-2">
                <Image src="/images/cta.svg" alt="Create a companion" width={280} height={180} className="opacity-95" />
            </div>

            <Link
                href="/companions/new"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90"
            >
                <Plus className="size-4" />
                Build a New Companion
            </Link>
        </section>
    )
}

export default Cta
