'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname()
    const router = useRouter()

    const searchParams = useSearchParams()

    const query = searchParams.get('topic') || ''

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const debouncedFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery
                })

                router.push(newUrl, { scroll: false })

            } else {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });

                router.push(newUrl, { scroll: false });
            }
        }, 300)
    }, [searchQuery, router, searchParams, pathname])

    return (
        <div className="group relative flex h-11 items-center gap-2.5 rounded-lg border border-input bg-card px-3.5 transition-all focus-within:border-primary focus-within:ring-[3px] focus-within:ring-ring hover:border-foreground/20">
            <Search className="size-4 text-muted-foreground" />
            <input
                placeholder="Search companions"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
