import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'

import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import BecomePro from './BecomePro'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:px-10">
                <Link href="/" className="group flex items-center gap-2.5">
                    <Image
                        src="/images/image.png"
                        alt="Dumbledore"
                        height={30}
                        width={32}
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="text-[15px] font-bold tracking-[-0.02em] max-md:hidden">
                        Dumbledore
                    </span>
                </Link>

                <div className="flex items-center gap-1.5 sm:gap-3">
                    <NavItems />

                    <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

                    <BecomePro />
                    <ThemeToggle />

                    <ClerkLoading>
                        <div className="ml-0.5 size-8 animate-pulse rounded-full bg-secondary" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="cursor-pointer rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                Sign in
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <div className="ml-0.5 flex items-center">
                                <UserButton
                                    appearance={{ elements: { avatarBox: 'h-8 w-8' } }}
                                />
                            </div>
                        </SignedIn>
                    </ClerkLoaded>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
