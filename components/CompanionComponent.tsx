'use client'

import { cn, configureAssistant, getSubjectTheme } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { addToSessionHistory } from '@/lib/actions/companion.actions'
import { Mic, MicOff, MessageSquareText, Phone, PhoneOff, X } from 'lucide-react'

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
    const [isMuted, setIsMuted] = useState(false)
    const [showTranscript, setShowTranscript] = useState(false)

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

    const toggleMic = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

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

    const isActive = callStatus === CallStatus.ACTIVE
    const isConnecting = callStatus === CallStatus.CONNECTING

    const statusLabel =
        callStatus === CallStatus.ACTIVE ? 'Live'
            : callStatus === CallStatus.CONNECTING ? 'Connecting'
                : callStatus === CallStatus.FINISHED ? 'Session ended'
                    : 'Ready to begin'

    const { tint: subjectTint, ink: subjectInk } = getSubjectTheme(subject)
    const showGlyph = !isActive
    // resting heights for the equalizer bars (percent of track)
    const barHeights = [42, 68, 100, 74, 50, 84, 38]

    return (
        <section className="relative mt-6 flex min-h-[70vh] flex-col overflow-hidden rounded-3xl border border-border bg-surface animate-fade">
            {/* Status pill */}
            <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium shadow-[var(--shadow-sm)] backdrop-blur-md">
                    <span className={cn(
                        'size-2 rounded-full',
                        isActive ? 'bg-success animate-pulse'
                            : isConnecting ? 'bg-cta-gold animate-pulse'
                                : 'bg-muted-foreground/50'
                    )} />
                    <span className="text-muted-foreground">{statusLabel}</span>
                </div>
            </div>

            {/* Stage */}
            <div className="flex flex-1 items-center justify-center px-6 py-20">
                <div className="flex w-full max-w-3xl items-center justify-center gap-8 max-sm:flex-col max-sm:gap-6">

                    {/* Companion */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative flex size-52 items-center justify-center rounded-full max-sm:size-40">
                            {/* Concentric pulse rings — radiate while the tutor speaks */}
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    aria-hidden
                                    className={cn(
                                        'absolute inset-0 rounded-full border transition-opacity duration-500',
                                        isSpeaking ? 'opacity-100 animate-ring-pulse' : 'opacity-0'
                                    )}
                                    style={{
                                        borderColor: `color-mix(in oklch, ${subjectInk} 55%, transparent)`,
                                        animationDelay: `${i * 0.7}s`,
                                    }}
                                />
                            ))}

                            <div
                                className="relative flex size-full items-center justify-center overflow-hidden rounded-full"
                                style={{
                                    backgroundColor: subjectTint,
                                    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${subjectInk} 28%, transparent), var(--shadow-md)`,
                                }}
                            >
                                {/* soft sheen */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 rounded-full"
                                    style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.4), transparent 55%)' }}
                                />

                                {/* Idle / connecting — subject glyph */}
                                <span
                                    aria-hidden
                                    className={cn(
                                        'absolute block size-20 transition-opacity duration-700 max-sm:size-14',
                                        showGlyph ? 'opacity-100' : 'opacity-0',
                                        isConnecting && 'animate-pulse'
                                    )}
                                    style={{
                                        backgroundColor: subjectInk,
                                        WebkitMaskImage: `url(/icons/${subject}.svg)`,
                                        maskImage: `url(/icons/${subject}.svg)`,
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center',
                                        maskPosition: 'center',
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                    }}
                                />

                                {/* Active — live audio equalizer */}
                                <div
                                    className={cn(
                                        'absolute flex h-20 items-center gap-[5px] transition-opacity duration-700 max-sm:h-14 max-sm:gap-1',
                                        isActive ? 'opacity-100' : 'opacity-0'
                                    )}
                                >
                                    {barHeights.map((h, i) => (
                                        <span
                                            key={i}
                                            className="w-1.5 rounded-full max-sm:w-1"
                                            style={{
                                                height: `${h}%`,
                                                backgroundColor: subjectInk,
                                                transformOrigin: 'center',
                                                animation: 'equalize 0.9s var(--ease-in-out) infinite',
                                                animationDelay: `${i * 0.12}s`,
                                                animationDuration: isSpeaking ? '0.7s' : '1.8s',
                                                animationPlayState: isActive ? 'running' : 'paused',
                                                opacity: isSpeaking ? 1 : 0.6,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs capitalize text-muted-foreground">{subject} tutor</p>
                        </div>
                    </div>

                    {/* User */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative size-52 max-sm:size-40">
                            <Image
                                src={userImage}
                                alt={userName}
                                fill
                                className="rounded-full object-cover shadow-[var(--shadow-md)]"
                            />
                            {isMuted && isActive && (
                                <div className="absolute bottom-1 right-1 flex size-9 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-sm)]">
                                    <MicOff className="size-4 text-destructive" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <p className="font-semibold">{userName}</p>
                            <p className="text-xs text-muted-foreground">You</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating controls */}
            <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
                <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-card/85 p-2 shadow-[var(--shadow-lg)] backdrop-blur-xl">
                    <button
                        onClick={toggleMic}
                        disabled={!isActive}
                        aria-label={isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        className={cn(
                            'flex size-12 items-center justify-center rounded-full transition-all duration-200 disabled:opacity-40',
                            isMuted ? 'bg-secondary text-foreground' : 'text-foreground hover:bg-accent'
                        )}
                    >
                        {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                    </button>

                    <button
                        onClick={() => setShowTranscript((v) => !v)}
                        aria-label="Toggle transcript"
                        className={cn(
                            'flex size-12 items-center justify-center rounded-full transition-all duration-200',
                            showTranscript ? 'bg-secondary text-foreground' : 'text-foreground hover:bg-accent'
                        )}
                    >
                        <MessageSquareText className="size-5" />
                    </button>

                    <button
                        onClick={isActive ? handleDisconnect : handleCall}
                        disabled={isConnecting}
                        className={cn(
                            'flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all duration-200',
                            isActive ? 'bg-destructive hover:brightness-105' : 'bg-primary hover:brightness-105',
                            isConnecting && 'animate-pulse'
                        )}
                    >
                        {isActive ? <PhoneOff className="size-4" /> : <Phone className="size-4" />}
                        {isActive ? 'End' : isConnecting ? 'Connecting' : 'Start'}
                    </button>
                </div>
            </div>

            {/* Transcript — hidden until toggled */}
            {showTranscript && (
                <div className="absolute inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-border bg-card/95 backdrop-blur-xl animate-fade max-sm:max-w-none">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <p className="text-sm font-semibold">Transcript</p>
                        <button
                            onClick={() => setShowTranscript(false)}
                            aria-label="Close transcript"
                            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                    <div className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto p-5">
                        {messages.length === 0 && (
                            <p className="text-sm text-muted-foreground">The conversation will appear here once the session begins.</p>
                        )}
                        {messages.map((message, index) => {
                            const isAssistant = message.role === 'assistant'
                            return (
                                <div key={index} className="flex flex-col gap-1">
                                    <span className={cn(
                                        'text-xs font-semibold',
                                        isAssistant ? 'text-muted-foreground' : 'text-primary'
                                    )}>
                                        {isAssistant ? name.split(' ')[0].replace(/[,.]/g, '') : userName}
                                    </span>
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}

export default CompanionComponent
