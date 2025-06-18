
interface PageProps{
    params:{
        id: string;
    }
}

const CompanionSessionPage = ({params}: PageProps) => {
  return (
    <div>CompanionSessionPage {params.id} </div>
  )
}

export default CompanionSessionPage