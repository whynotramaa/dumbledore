'use client'

import Image from 'next/image'
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
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
            <Image src='/icons/search.svg' alt='search' width={15} height={15} />
            <input
                placeholder='Search Companions'
                className='text-sm outline-none p-1'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

        </div>
    )
}

export default SearchInput