'use client'

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from '@/lib/actions/companion.actions'
enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: {
                subject, topic, style
            },
            clientMessages: ['transcript'],
            serverMessages: [],

        }

        // @ts-expect-error type seems to be right
        vapi.start(configureAssistant(voice, style), assistantOverrides)


    }


    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    const [isMuted, setIsMuted] = useState(false)

    const toggleMic = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {
        // Ensure that the Lottie component has mounted and assigned itself to lottieRef.current
        if (lottieRef.current) {
            if (isSpeaking) {
                lottieRef.current.play();
            } else {
                lottieRef.current.stop();
            }
        }
    }, [isSpeaking]); // Only re-run when isSpeaking changes

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(companionId)
        }
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role, content: message.transcript
                }
                setMessages((prev) => [newMessage, ...prev])
            }
        }
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)

        const onError = (Error: string) => console.log(Error)

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
        }

    }, [])


    return (
        <section className='flex flex-col h-[70vh] justify-center items-center -mt-6 px-4'>
            <section className='flex flex-col items-center gap-8 w-full max-w-4xl'>

                {/* Top row: Avatars */}
                <div className='flex gap-18 max-sm:flex-col items-center justify-center w-full'>
                    <div className="companion-section flex flex-col items-center text-center">
                        <div className="companion-avatar p-30 relative w-48 h-48 sm:w-36 sm:h-36 flex items-center justify-center rounded-full" style={{ backgroundColor: getSubjectColor(subject) }}>
                            <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={100} height={100} className='' />
                            </div>

                            <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={soundwaves}
                                    autoPlay={false}
                                    className='companion-lottie'
                                />
                            </div>
                        </div>
                        <p className='font-bold text-xl mt-2'>{name}</p>
                    </div>

                    <div className="flex max-md:hidden rounded-full flex-col items-center text-center">
                        <div className="rounded-full">
                            <Image src={userImage} alt={userName} width={130} height={130} className='rounded-full shadow-md' />
                            <p className='font-bold text-2xl mt-2'>{userName}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom row: Buttons (equal width) */}
                <div className='flex sm:flex-row gap-4 items-center justify-center w-full '>
                    <button disabled={callStatus != CallStatus.ACTIVE} className=' border-1 duration-300 flex flex-row items-center justify-center gap-2 w-xl px-4 py-2.5 max-md:py-4 max-md:rounded-full max-md:w-fit rounded-lg bg-gray-100 hover:bg-gray-200 transition-all' onClick={toggleMic}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='mic' height={26} width={26} />
                        <p className='max-sm:hidden text-sm font-medium'>
                            {isMuted ? "Turn on microphone" : "Turn off microphone"}
                        </p>
                    </button>

                    <button className={cn(
                        'w-full px-4 py-3 rounded-lg cursor-pointer text-white font-semibold transition-colors text-center',
                        callStatus === CallStatus.ACTIVE ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-dark',
                        callStatus === CallStatus.CONNECTING && 'animate-pulse'
                    )} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {
                            callStatus === CallStatus.ACTIVE
                                ? "End Session"
                                : callStatus === CallStatus.CONNECTING
                                    ? 'Connecting'
                                    : 'Start Session'
                        }
                    </button>
                </div>
            </section>
            <section className='transcript flex justify-center items-center'>
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className='text-sm'>
                                    {name.split(' ')[0].replace(/[,.]/g, '')}:{message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className='text-primary text-sm' >
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>
                <div className='transcript-fade' />
            </section>
        </section >


    )
}

export default CompanionComponent