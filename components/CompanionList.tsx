import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { subjects } from "@/constants";
import { cn, getSubjectColor } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanionsListProps {
    title: string,
    companions?: Companion[];
    className?: string;

}

const CompanionList = ({ title, companions, className }: CompanionsListProps) => {
    return (
        <article className={cn('border p-5 rounded-lg', className)}>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl p-2">
                    {title}
                </h2>
                <h4 className="flex md:hidden gap-1 text items-baseline-last text-sm text-gray-400">
                    Swipe <ArrowRightCircle className="size-[12px]" />
                </h4>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg font-bold  w-2/3">Lessons</TableHead>
                        <TableHead className="">Subject</TableHead>
                        <TableHead className="text-right ">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {companions?.map((companion) => (
                        <TableRow key={companion.id} >
                            <TableCell className="py-4">
                                <Link href={`/companions/${companion.id}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="size-[52px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                                            <Image src={`/icons/${companion.subject}.svg`} alt="Subject" width={22} height={22} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-xl">
                                                {companion.name}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap max-md:w-70 w-122">
                                                {companion.topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {companion.subject}
                                </div>

                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                                    <Image
                                        src={`/icons/${companion.subject}.svg`}
                                        alt="subject logo"
                                        height={18}
                                        width={18}
                                    />
                                </div>


                            </TableCell>

                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-xl">
                                        {companion.duration}
                                        {''}
                                        <span className="max-md:hidden">
                                            mins
                                        </span>
                                    </p>
                                    <Image src={`/icons/clock.svg`} alt="minutes" width={14} height={14} className="md:hidden" />
                                </div>
                            </TableCell>



                        </TableRow>
                    ))}


                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionList