import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>
}

// params --> /url/{id} so here we can extract id
// searchParams --> /url?key=value...



const CompanionSessionPage = async ({ params }: PageProps) => {

  const { id } = await params
  const companion = await getCompanion(id)
  const user = await currentUser()

  const { name, subject, title, topic, duration } = companion

  if (!user) redirect('/sign-in')
  if (!companion) redirect('/companions')


  return (
    <main>
      <article className="flex border rounded-2xl max-md:m-4 max-md:rounded-4xl justify-between p-6 max-md:flex-col">
        <div className="flex items-center max-md:justify-center max-md:items-center gap-3">
          <div className="size-[52px] flex items-center justify-center rounded-xl max-md:hidden" style={{ backgroundColor: getSubjectColor(companion.subject) }}>
            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={20} height={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">
                {companion.name}
              </p>
              <div className="subject-badge text-xs max-sm:hidden">
                {companion.subject}
              </div>
            </div>
            <p className="text-sm">
              {companion.topic}
            </p>
          </div>
        </div>
        <div className="items-start text-sm font-semibold text-green-700 max-md:hidden">
          {companion.duration} minutes
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