import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function ScanSkeleton() {
    return (
        <>
            <div className="mb-8 w-full">
                <h2 className="sm:text-1xl mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                    Scan Result
                </h2>
                <div className="mt-5 rounded-xl bg-slate-50 pt-0.5 dark:bg-slate-800/25">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px] border-b p-4 py-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Key
                                </TableHead>
                                <TableHead className="border-b p-4 py-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                    Value
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(Array(5).keys()).map((i) => (
                                <TableRow key={i}>
                                    <TableCell className="border-b border-slate-100 font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                        <Skeleton className="h-5" />
                                    </TableCell>
                                    <TableCell className="border-b border-slate-100 dark:border-slate-700">
                                        <Skeleton className="h-5" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableCaption className="pb-4 text-center text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                            Loading results...
                        </TableCaption>
                    </Table>
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
