import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "rounded-half h-5 w-2/5 animate-pulse bg-gray-300 dark:bg-gray-600",
                className
            )}
            {...props}
        />
    )
}
