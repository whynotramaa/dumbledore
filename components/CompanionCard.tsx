import { Clock, Play } from "lucide-react"
import Link from "next/link"
import SubjectIcon from "./SubjectIcon"

interface CompanionCardProps {
    id: string,
    name: string,
    subject: string,
    topic: string,
    duration: number,
    color: string,
}

const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
    return (
        <article className="group relative flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[var(--shadow-md)]">
            <div className="flex items-start justify-between gap-3">
                <SubjectIcon subject={subject} className="size-12" iconClassName="size-5.5" />
                <span className="subject-badge">{subject}</span>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold leading-snug tracking-[-0.01em]">
                    {name}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {topic}
                </p>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>{duration} min</span>
                </div>
                <Link
                    href={`/companions/${id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary"
                >
                    <Play className="size-3.5 fill-current" />
                    Launch
                </Link>
            </div>
        </article>
    )
}

export default CompanionCard
