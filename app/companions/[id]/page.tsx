import CompanionComponent from "@/components/CompanionComponent";
import SubjectIcon from "@/components/SubjectIcon";
import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { Clock } from "lucide-react";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>
}

const CompanionSessionPage = async ({ params }: PageProps) => {

  const { id } = await params
  const companion = await getCompanion(id)
  const user = await currentUser()

  const { name, subject, title, topic, duration } = companion

  if (!user) redirect('/sign-in')
  if (!companion) redirect('/companions')

  return (
    <main className="max-w-[1000px]">
      <article className="panel flex items-center justify-between gap-4 p-4 md:p-5 animate-rise">
        <div className="flex min-w-0 items-center gap-3.5">
          <SubjectIcon subject={companion.subject} className="size-12" iconClassName="size-5.5" />
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2">
              <p className="truncate font-semibold">{companion.name}</p>
              <span className="subject-badge max-sm:hidden">{companion.subject}</span>
            </div>
            <p className="truncate text-sm text-muted-foreground">{companion.topic}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-muted-foreground max-sm:hidden">
          <Clock className="size-3.5" />
          {companion.duration} min
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.username!}
        userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSessionPage
