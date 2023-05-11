import { type } from "os"
import React from "react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface ScanProps {
    data: Record<string, string>
}

const DNSScan: React.FC<ScanProps> = ({ data }) => {
    return (
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
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell className="border-b border-slate-100 font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                {key}
                            </TableCell>
                            <TableCell className="border-b border-slate-100 dark:border-slate-700">
                                {typeof value === "object" ? (
                                    <>
                                        {(value as string[])?.map(
                                            (x: string) => (
                                                <div key={String(x)}>{x}</div>
                                            )
                                        )}
                                    </>
                                ) : (
                                    value
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableCaption className="pb-4 text-center text-xs font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    These are the results from running a DNS Scan
                </TableCaption>
            </Table>
        </div>
    )
}

export default DNSScan
