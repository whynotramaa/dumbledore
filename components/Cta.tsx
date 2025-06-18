import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cta = () => {
    return (
        <section className='cta-section mb-2'>
            <div className="cta-badge text-sm">
                Start learning your way
            </div>
            <h2 className="text-2xl text-wrap font-bold">
                Build and  <span className='uppercase text-primary'>personalize</span> your learning companion
            </h2>
            <p>
                Pick a name, subject, voice & personality - and start learning through conversations that feel natural and fun.
            </p>
            <Image src="images/cta.svg" alt='cta' width={362} height={232} />
            <button className='btn-primary'>
                <Image src="/icons/plus.svg" alt='plus' height={12} width={12} />
                <Link href="/companions/new">
                    <p>
                        Build a New Companion
                    </p>
                </Link>
            </button>
        </section>
    )
}

export default Cta