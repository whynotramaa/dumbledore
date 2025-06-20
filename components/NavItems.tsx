'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Companions",
        href: "/companions"
    },
    {
        label: "My Journey",
        href: "/my-journey"
    },

]
const NavItems = () => {

    const pathname = usePathname() // as we are using hook, we mjust turn entire thing is client component 

    return (
        <nav className='flex items-center gap-4 text-xs md:text-sm'>
            {navItems.map(({ label, href }) => ( /* we are not using {} bcz we need to directly return stuffs and not do any JS logic */
                <Link href={href} key={label} className={cn(pathname === href && 'text-primary font-semibold')} >
                    {label}
                </Link>
            ))}

        </nav>
    )
}

export default NavItems