// Lightweight, dependency-free loader — a 3×3 grid that pulses in a
// diagonal wave. Matches the architectural, premium design language and
// ships zero JS animation runtime (no Lottie), keeping route transitions fast.

const CELLS = Array.from({ length: 9 })

// diagonal delay so the pulse sweeps across the grid
const delays = [0, 1, 2, 1, 2, 3, 2, 3, 4]

export default function Loading() {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-6 bg-background">
            <div className="grid grid-cols-3 gap-1.5" aria-hidden>
                {CELLS.map((_, i) => (
                    <span
                        key={i}
                        className="size-3 rounded-[4px] bg-primary animate-grid-pulse"
                        style={{ animationDelay: `${delays[i] * 90}ms` }}
                    />
                ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
                Loading
            </p>
        </div>
    )
}
