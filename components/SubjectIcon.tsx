import { cn, getSubjectTheme } from "@/lib/utils"

interface SubjectIconProps {
    subject: string
    /** tile size + radius classes, e.g. "size-12 rounded-xl" */
    className?: string
    /** inner glyph size, e.g. "size-5" */
    iconClassName?: string
}

/**
 * Renders a subject glyph inside a soft, subject-tinted tile.
 * The SVG is drawn via CSS mask so it is recolored to the subject's
 * saturated `ink` and scaled with `contain` — keeping every subject
 * uniform regardless of the source file's viewBox. A hairline inner
 * ring adds architectural definition; the glyph lifts subtly on the
 * nearest `group` hover for a premium micro-interaction.
 */
const SubjectIcon = ({ subject, className, iconClassName }: SubjectIconProps) => {
    const { tint, ink } = getSubjectTheme(subject)

    return (
        <div
            className={cn(
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl",
                "transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.04]",
                className,
            )}
            style={{
                backgroundColor: tint,
                boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${ink} 22%, transparent)`,
            }}
        >
            {/* soft top sheen for depth */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.35), transparent 60%)" }}
            />
            <span
                aria-hidden
                className={cn(
                    "relative block size-5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110",
                    iconClassName,
                )}
                style={{
                    backgroundColor: ink,
                    WebkitMaskImage: `url(/icons/${subject}.svg)`,
                    maskImage: `url(/icons/${subject}.svg)`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                }}
            />
        </div>
    )
}

export default SubjectIcon
