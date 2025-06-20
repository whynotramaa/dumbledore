import CompanionList from "@/components/CompanionList"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserComapanion, userSession } from "@/lib/actions/companion.actions"
import { currentUser } from "@clerk/nextjs/server"
import { Wifi, WifiHighIcon } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"


const ProfilePage = async () => {

  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const companions = await getUserComapanion(user.id)

  const sessionHistory = await userSession(user.id)

  const LastActive = user?.lastActiveAt
    ? new Date(user.lastActiveAt).toLocaleString()
    : "Unknown";

  const isUserActive = (lastActiveAt: number | null | undefined) => {
    if (!lastActiveAt) return false;

    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in ms

    return now - lastActiveAt < fiveMinutes;
  };



  return (
    <main className='min-lg:w-3/4'>
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">

        <Image src={user.imageUrl!} alt={user.fullName!} width={110} height={110} className="rounded-lg shadow-2xl" />
        <div className="flex flex-col justify-center max-md:items-center gap-2">
          <h1 className="font-bold text-xl">
            {user.firstName!} {user.lastName!}
          </h1>
          <p className="text-sm flex-col text-muted-foreground">
            {user.emailAddresses[0].emailAddress}

            <div className="flex justify-center items-center gap-2">
              {isUserActive(user?.lastActiveAt) ? (
                <span className="flex items-center gap-1">
                  <Wifi className="w-4 text-green-500" />
                  Active Now
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <WifiHighIcon className="w-4 text-red-500" />
                  {LastActive}
                </span>
              )}
            </div>

          </p>
        </div>
        <div className="flex gap-4">
          <div className="border  rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src='/icons/check.svg' alt="check-icon" width={22} height={22} />
              <p className="text-2xl font-bold">
                {sessionHistory.length}
              </p>
            </div>
            <div>
              Lessons Completed
            </div>
          </div>
          <div className="border  rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src='/icons/cap.svg' alt="cap-icon" width={22} height={22} />
              <p className="text-2xl font-bold">
                {companions.length}
              </p>
            </div>
            <div>
              Companions Created
            </div>
          </div>
        </div>
      </section>
      <CompanionList title="Recent Sessions" companions={sessionHistory} />
      <CompanionList title="My Companions" companions={companions} />

    </main>
  )
}

export default ProfilePage