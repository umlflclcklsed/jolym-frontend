import { cn } from "@/lib/utils"

type ShimmerCardProps = {
  className?: string
}

export function ShimmerCard({ className }: ShimmerCardProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        <div className="absolute inset-0 shimmer-effect" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-6 w-2/3 bg-muted rounded shimmer-effect" />
        <div className="h-4 w-1/2 bg-muted rounded shimmer-effect" />
        <div className="h-10 w-full bg-muted rounded mt-6 shimmer-effect" />
      </div>
    </div>
  )
}
