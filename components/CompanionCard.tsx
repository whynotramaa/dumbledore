import Image from "next/image"
import Link from "next/link"

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
        <div className="w-full px-4 sm:w-full sm:max-w-none sm:px-0">
            <article
                className="w-full p-4 sm:p-6 rounded-lg text-black space-y-4"
                style={{ backgroundColor: color }}
            >
                <div className="flex justify-between items-center">
                    <div className="bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold">
                        {subject}
                    </div>
                    <button className="hover:opacity-80 companion-bookmark transition">
                        <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />
                    </button>
                </div>

                <h2 className="font-bold text-2xl leading-snug">
                    {name}
                </h2>

                <p className="text-sm opacity-90">
                    {topic}
                </p>

                <div className="flex items-center gap-2 text-sm opacity-90">
                    <Image src="/icons/clock.svg" className="text-white" alt="clock" height={13.5} width={13.5} />
                    <p>
                        {duration} mins duration
                    </p>
                </div>

                <Link href={`/companions/${id}`} className="block w-full">
                    <button className="btn-primary w-full justify-center">
                        Launch Lesson
                    </button>
                </Link>
            </article>
        </div>
    )
}

export default CompanionCard
