import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import BecomePro from './BecomePro'



const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/image.png"
                        alt='logo'
                        height={34}
                        width={36}
                    />
                    <h4 className='font-bold max-md:hidden'>
                        Dumbledore 🎀
                    </h4>
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <BecomePro />
                <SignedOut>
                    <div className="flex items-center gap-2 text-sm">
                        <SignInButton mode='modal'>
                            <button className='border-1 rounded-4xl md:text-sm text-xs border-gray-500 cursor-pointer hover:bg-orange-500 trasnition transition-all hover:text-white hover:font-semibold hover:border-white py-2 px-4'>
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>

            </div>
        </nav>
    )
}

export default Navbar