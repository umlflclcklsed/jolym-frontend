import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "dots" | "spinner" | "pulse"
  className?: string
}

export function Loading({ size = "md", variant = "dots", className }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  if (variant === "dots") {
    return (
      <div
        className={cn(
          "loading-dots flex items-center justify-center space-x-1",
          {
            "space-x-0.5": size === "sm",
            "space-x-1": size === "md",
            "space-x-2": size === "lg",
          },
          className,
        )}
      >
        <div
          className={cn("rounded-full bg-emerald-500 dark:bg-emerald-400", {
            "h-1 w-1": size === "sm",
            "h-2 w-2": size === "md",
            "h-3 w-3": size === "lg",
          })}
        ></div>
        <div
          className={cn("rounded-full bg-emerald-500 dark:bg-emerald-400", {
            "h-1 w-1": size === "sm",
            "h-2 w-2": size === "md",
            "h-3 w-3": size === "lg",
          })}
        ></div>
        <div
          className={cn("rounded-full bg-emerald-500 dark:bg-emerald-400", {
            "h-1 w-1": size === "sm",
            "h-2 w-2": size === "md",
            "h-3 w-3": size === "lg",
          })}
        ></div>
      </div>
    )
  }

  if (variant === "spinner") {
    return (
      <div className={cn("animate-spin text-emerald-500 dark:text-emerald-400", sizeClasses, className)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-full h-full">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400", sizeClasses)}></div>
      </div>
    )
  }

  return null
}
