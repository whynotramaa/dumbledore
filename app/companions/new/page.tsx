import CompanionForm from "@/components/CompanionForm"


const NewCompanionPage = () => {
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