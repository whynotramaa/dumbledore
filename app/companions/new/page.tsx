import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server"
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanionPage = async () => {

  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in')
  }

  const canCreateCompanion = await newCompanionPermission()

  return (
    <main className="max-w-2xl">
      {canCreateCompanion ? (
        <>
          <section className="flex flex-col gap-2 animate-rise">
            <span className="eyebrow">Create</span>
            <h1>Build your own companion</h1>
            <p className="text-base text-muted-foreground">
              Shape a tutor&apos;s subject, voice and personality — it&apos;ll be ready in seconds.
            </p>
          </section>
          <div className="animate-rise">
            <CompanionForm />
          </div>
        </>
      ) : (
        <section className="mx-auto flex max-w-md flex-col items-center gap-6 py-16 text-center animate-fade">
          <Image src="/images/limit.svg" alt="Companion Limit Reached" height={200} width={320} className="opacity-95" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cta-gold px-3 py-1 text-xs font-semibold text-black">
            <Lock className="size-3.5" />
            Upgrade your plan
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">You&apos;ve reached your limit</h1>
            <p className="text-muted-foreground">
              You&apos;ve hit your companion limit. Upgrade to create more and unlock premium features.
            </p>
          </div>
          <Link href="/subscription" className="btn-primary w-full justify-center py-3">
            Upgrade your plan
          </Link>
        </section>
      )}
    </main>
  )
}

export default NewCompanionPage
