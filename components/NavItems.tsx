'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Companions", href: "/companions" },
    { label: "My Journey", href: "/my-journey" },
]

const NavItems = () => {
    const pathname = usePathname()

    return (
        <nav className="flex items-center gap-0.5 rounded-full bg-secondary/60 p-1">
            {navItems.map(({ label, href }) => {
                const active = pathname === href
                return (
                    <Link
                        href={href}
                        key={label}
                        className={cn(
                            "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 md:text-sm",
                            active
                                ? "bg-card text-foreground shadow-[var(--shadow-xs)]"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {label}
                    </Link>
                )
            })}
        </nav>
    )
}

export default NavItems
