import CompanionList from "@/components/CompanionList"
import { getUserComapanion, userSession } from "@/lib/actions/companion.actions"
import { currentUser } from "@clerk/nextjs/server"
import { CheckCircle2, GraduationCap } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"

const ProfilePage = async () => {

  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const companions = await getUserComapanion(user.id)
  const sessionHistory = await userSession(user.id)

  const LastActive = user?.lastActiveAt
    ? new Date(user.lastActiveAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : "Unknown";

  const isUserActive = (lastActiveAt: number | null | undefined) => {
    if (!lastActiveAt) return false;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return now - lastActiveAt < fiveMinutes;
  };

  const active = isUserActive(user?.lastActiveAt)

  const stats = [
    { label: "Lessons completed", value: sessionHistory.length, Icon: CheckCircle2 },
    { label: "Companions created", value: companions.length, Icon: GraduationCap },
  ]

  return (
    <main>
      <section className="panel flex flex-col gap-6 p-6 animate-rise md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-center gap-5 max-md:flex-col max-md:text-center">
          <Image
            src={user.imageUrl!}
            alt={user.fullName!}
            width={88}
            height={88}
            className="size-[88px] rounded-2xl object-cover shadow-[var(--shadow-md)]"
          />
          <div className="flex flex-col gap-1.5 max-md:items-center">
            <h1 className="text-2xl">{user.firstName!} {user.lastName!}</h1>
            <p className="text-sm text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs">
              <span className={active ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-muted-foreground/50"} />
              <span className="text-muted-foreground">
                {active ? "Active now" : `Last active ${LastActive} IST`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
              <Icon className="size-5 text-primary" />
              <p className="text-2xl font-bold tracking-[-0.02em]">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-6 animate-rise">
        <CompanionList title="Recent sessions" companions={sessionHistory} />
        <CompanionList title="My companions" companions={companions} />
      </div>
    </main>
  )
}

export default ProfilePage
