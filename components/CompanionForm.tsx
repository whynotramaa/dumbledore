'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2, "Companion name is required"),
    topic: z.string().min(2, "Companion topic is required"),
    subject: z.string().min(2, "Companion subject is required"),
    voice: z.string().min(2, "Companion voice is required"),
    style: z.string().min(2, "Companion style is required"),
    duration: z.coerce.number().min(1, "Companion duration is required"),
})

const CompanionForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            topic: "",
            subject: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const companion = await createCompanion(values)

        if (companion) {
            redirect(`/companions/${companion.id}`)
        } else {
            console.log("Failed to create a new companion")
            redirect(`/`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your companion name"
                                    {...field}
                                    className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem value={subject} key={subject} className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help you with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Probability & Statistics"
                                    {...field}
                                    className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select the voice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition capitalize">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male" className="capitalize">Male</SelectItem>
                                        <SelectItem value="female" className="capitalize">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select the tone</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition capitalize">
                                        <SelectValue placeholder="Select the tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal" className="capitalize">Formal</SelectItem>
                                        <SelectItem value="casual" className="capitalize">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated duration of session</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15 mins"
                                    {...field}
                                    className="w-full px-4 py-5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full py-3 font-semibold bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                    Build your companion
                </Button>
            </form>
        </Form>
    )
}

export default CompanionForm
