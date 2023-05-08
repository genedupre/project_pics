import Link from "next/link"

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

export function LatestCVEsSkeleton() {
    return (
        <div className="w-full">
            <h2 className="sm:text-1xl text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                Latest CVEs
            </h2>
            <h3 className="text-slate-700 dark:text-slate-400">
                The latest CVEs are not related to scan results, but are pulled
                from the NIST database to provide a quick reference to the
                latest CVEs.
            </h3>
            <div className="mt-5 rounded-xl bg-slate-50 pt-0.5 dark:bg-slate-800/25">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px] border-b p-4 py-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                ID
                            </TableHead>
                            <TableHead className="border-b p-4 py-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                Description
                            </TableHead>
                            <TableHead className="w-[50px] border-b text-right dark:border-slate-600"></TableHead>
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
                                <TableCell className="border-b border-slate-100 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                    <Skeleton className="h-5" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCaption className="pb-4 text-center text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Data provided by{" "}
                        <Link href="https://nvd.nist.gov/" target="_blank">
                            National Institute of Standards and Technology
                            (NIST)
                        </Link>
                    </TableCaption>
                </Table>
            </div>
        </div>
    )
}
