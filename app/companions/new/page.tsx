import CompanionForm from "@/components/CompanionForm"
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const NewCompanionPage = async () => {

  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in')
    // return { error: "You must sign in before creating a companion." }
  }

  const canCreateCompanion = await newCompanionPermission()

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (<article className="w-full flex-col">
        <h1 className="mb-6 flex justify-center items-center max-md:p-1 max-md:text-xl">
          Make your own companion.
        </h1>
        <CompanionForm />
      </article>) :
        (
          <article className="companion-limit">
            <Image src="/images/limit.svg" alt="Companion Limit Reached" height={230} width={360} />
            <div className="cta-badge mt-10">
              Upgrade your plan
            </div>

            <h1>
              Yuu have reached your limit.
            </h1>
            <p>
              Hey, we noticed that you have reached your companion limit. Upgrade to create more companions and access premium features.
            </p>
            <Link href="/subscription" className="btn-primary w-full justify-center ">
              Upgrade your plan
            </Link>
          </article>
        )
      }
    </main>
  )
}

export default NewCompanionPage