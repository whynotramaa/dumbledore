import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex justify-center items-center p-12'>
            <SignIn />
        </div>
    )
}