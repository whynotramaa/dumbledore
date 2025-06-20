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

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%, name.ilike.%${topic}`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}`)
    }


    query = query.range((page - 1) * limit, page * limit - 1)

    const { data: companions, error } = await query

    if (error) throw new Error(error.message)

    return companions
}


export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.from('companions').select().eq('id', id)

    if (error) return console.log(error)

    return data[0]
}


export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from('session_history').insert({
        companion_id: companionId,
        user_id: userId,
    })

    if (error) throw new Error(error.message)

    return data
}


export const recentSession = async (limit = 10) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from('session_history').select(`companions:companion_id(*)`).order('created_at', { ascending: false }).limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions)

}

export const userSession = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from('session_history').select(`companions:companion_id(*)`).eq('user_id', userId).order('created_at', { ascending: false }).limit(limit)

    if (error) throw new Error(error.message)

    return data.map(({ companions }) => companions)

}



export const getUserComapanion = async (userId: string) => {
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from('companions').select().eq('author', userId)

    if (error) throw new Error(error.message)

    return data

}

export const newCompanionPermission = async () => {
    const { userId, has } = await auth()
    const supabase = createSupabaseClient()
    let limit = 0

    if (has({ plan: 'pro_learner' })) {
        return true
    } else if (has({ feature: "3_active_companions" })) {
        limit = 3
    } else if (has({ feature: "10_active_companions" })) {
        limit = 10
    }

    const { data, error } = await supabase.from('companions').select('id', { count: 'exact' }).eq('author', userId)

    if (error) throw new Error(error.message)

    const companionCount = data?.length

    if (companionCount >= limit) {
        return false
    } else {
        return true
    }

}
