import { Skeleton } from "@/components/ui/skeleton"

export async function LatestCVEsSkeleton() {
    return (
        <>
            {Array.from(Array(5).keys()).map((i) => (
                <tr key={i}>
                    <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <Skeleton className="h-5 w-3/5" />
                    </td>
                    <td className="border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <Skeleton className="h-5 w-full" />
                    </td>
                    <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <Skeleton className="h-5 w-3/5" />
                    </td>
                    <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <Skeleton className="h-5 w-3/5" />
                    </td>
                </tr>
            ))}
        </>
    )
}
