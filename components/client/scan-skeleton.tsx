import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function ScanSkeleton() {
    return (
        <>
            <div className="mb-8 w-full">
                <h2 className="sm:text-1xl mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                    Scan Result
                </h2>
                <div className="not-prose relative mt-5 hidden overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25 md:block">
                    <div
                        style={{ backgroundPosition: "10px 10px" }}
                        className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                    ></div>
                    <div className="relative overflow-auto rounded-xl">
                        <div className="my-4 overflow-hidden shadow-sm">
                            <table className="w-full table-auto border-collapse text-sm">
                                <thead>
                                    <tr>
                                        <th className="w-1/6 border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                            Key
                                        </th>
                                        <th className="w-4/6 border-b p-4 pb-3 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white dark:bg-slate-800"
                                    key="scan-result"
                                >
                                    {Array.from(Array(5).keys()).map((i) => (
                                        <tr key={i}>
                                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                <Skeleton className="h-5 w-3/5" />
                                            </td>
                                            <td className="border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                <Skeleton className="h-5 w-5/6" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                            Loading...
                        </p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
                </div>
            </div>
            <Separator className="hidden md:block" />
            <div className="not-prose relative mb-4 mt-8 overflow-hidden rounded-xl border bg-slate-50 dark:border-slate-700 dark:bg-slate-800/25">
                <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
                    <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
                        <div className="flex items-center space-x-1 sm:pr-4">
                            JSON Output
                        </div>
                    </div>
                </div>
                <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
                    <Skeleton className="h-5 w-3/5" />
                    <Skeleton className="mt-1 h-5 w-2/5" />
                    <Skeleton className="mt-1 h-5 w-1/5" />
                    <Skeleton className="mt-1 h-5 w-3/5" />
                </div>
            </div>
        </>
    )
}
