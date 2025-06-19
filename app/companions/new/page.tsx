import CompanionForm from "@/components/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const NewCompanionPage = async () => {

  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in')
    // return { error: "You must sign in before creating a companion." }
  }

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="w-full flex-col">
        <h1 className="mb-6">
          Make your own companion.
        </h1>
        <CompanionForm />
      </article>
    </main>
  )
}

export default NewCompanionPage