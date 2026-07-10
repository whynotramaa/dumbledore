import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { Clock, Snail } from "lucide-react";
import Link from "next/link";
import SubjectIcon from "./SubjectIcon";

interface CompanionsListProps {
    title: string,
    companions?: Companion[];
    className?: string;
}

const CompanionList = ({ title, companions, className }: CompanionsListProps) => {
    return (
        <article className={cn('panel overflow-hidden', className)}>
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <h2 className="text-lg font-semibold tracking-[-0.01em]">{title}</h2>
                {companions && companions.length > 0 && (
                    <span className="text-xs font-medium text-muted-foreground">
                        {companions.length} {companions.length === 1 ? 'session' : 'sessions'}
                    </span>
                )}
            </div>

            {companions && companions.length > 0 ? (
                <div className="px-3 pb-3">
                    <Table className="table-fixed">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-3">Lesson</TableHead>
                                <TableHead className="w-[120px] max-md:hidden">Subject</TableHead>
                                <TableHead className="w-[92px] pr-3 text-right">Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companions.map((companion) => (
                                <TableRow key={companion.id + Math.random()} className="group">
                                    <TableCell className="py-3 pl-3">
                                        <Link href={`/companions/${companion.id}`} className="flex min-w-0 items-center gap-3">
                                            <SubjectIcon
                                                subject={companion.subject}
                                                className="size-11 max-md:size-9"
                                            />
                                            <div className="flex min-w-0 flex-col gap-0.5">
                                                <p className="truncate font-semibold transition-colors group-hover:text-primary">
                                                    {companion.name}
                                                </p>
                                                <p className="truncate text-sm text-muted-foreground">
                                                    {companion.topic}
                                                </p>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="max-md:hidden">
                                        <span className="subject-badge">{companion.subject}</span>
                                    </TableCell>
                                    <TableCell className="pr-3">
                                        <div className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
                                            <Clock className="size-3.5 md:hidden" />
                                            <span className="font-medium text-foreground">{companion.duration}</span>
                                            <span className="max-md:hidden">min</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                        <Snail className="size-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-medium">Nothing here yet</p>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Your sessions will appear here once you start learning.
                        </p>
                    </div>
                    <Link href="/companions" className="btn-outline mt-1 text-sm">
                        Browse companions
                    </Link>
                </div>
            )}
        </article>
    )
}

export default CompanionList
