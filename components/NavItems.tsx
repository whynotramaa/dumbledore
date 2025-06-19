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
        <nav className='flex items-center gap-4'>
            {navItems.map(({ label, href }) => ( /* we are not using {} bcz we need to directly return stuffs and not do any JS logic */
                <Link href={href} key={label} className={cn(pathname === href && 'text-primary font-semibold')} >
                    {label}
                </Link>
            ))}
            {/* <Link href='/interview' className="border-2 border-orange-500 py-2 px-4 rounded-lg hover:bg-orange-500 transition-all hover:text-amber-50 hover:font-bold">
                Interview
            </Link> */}
        </nav>
    )
}

export default NavItems