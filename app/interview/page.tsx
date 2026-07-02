import { Construction } from 'lucide-react'
import React from 'react'

const InterviewPage = () => {
    return (
        <main>
            <section className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center animate-fade">
                <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                    <Construction className="size-6" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl">Interviews are coming soon</h1>
                    <p className="text-muted-foreground">
                        We&apos;re crafting a new way to practice. Check back shortly.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default InterviewPage
