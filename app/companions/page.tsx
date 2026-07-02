import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SearchX } from "lucide-react";

const CompanionPage = async ({ searchParams }: SearchParams) => {

    const filters = await searchParams;

    const subject = filters.subject ? filters.subject : ''
    const topic = filters.topic ? filters.topic : ''

    const companions = await getAllCompanions({ subject, topic })

    return (
        <main>
            <section className="flex flex-col gap-4 animate-rise sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2">
                    <span className="eyebrow">Library</span>
                    <h1>Companion Library</h1>
                </div>
                <div className="flex gap-3">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>

            {companions.length > 0 ? (
                <section className="companions-grid animate-rise">
                    {companions.map((companion) => (
                        <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
                    ))}
                </section>
            ) : (
                <section className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-24 text-center animate-fade">
                    <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                        <SearchX className="size-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold">No companions found</p>
                        <p className="max-w-sm text-sm text-muted-foreground">
                            Try adjusting your search or filters to find what you&apos;re looking for.
                        </p>
                    </div>
                </section>
            )}
        </main>
    )
}

export default CompanionPage
