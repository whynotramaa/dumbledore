'use server'

import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '../supabase'

export const createCompanion = async (formData: CreateCompanion) => {
    try {
        const { userId } = await auth()
        console.log("User ID:", userId)

        const supabase = await createSupabaseClient()
        console.log("Supabase client initialized")

        const { data, error } = await supabase
            .from('companions') // i had mistakenly named table as Companion -----
            .insert({
                ...formData,
                author: userId,
            })
            .select()

        console.log("Insert response:", { data, error })

        if (error || !data) {
            console.error("Insert failed:", error)
            throw new Error(error?.message || 'Failed to create a companion.')
        }

        return data[0]
    } catch (err) {
        console.error("Unhandled error in createCompanion:", err)
        throw new Error("Something went wrong while creating the companion.")
    }
}
