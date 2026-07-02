'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const isDark = resolvedTheme === 'dark'

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
            {/* Render nothing icon-specific until mounted to avoid hydration mismatch */}
            <Sun
                className={`size-[18px] transition-all duration-300 ${mounted && !isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
                    }`}
            />
            <Moon
                className={`absolute size-[18px] transition-all duration-300 ${mounted && isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-90 opacity-0'
                    }`}
            />
        </button>
    )
}

export default ThemeToggle
