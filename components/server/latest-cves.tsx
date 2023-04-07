import Link from "next/link"

import { Icons } from "@/components/icons"
import { LatestCVEsSkeleton } from "@/components/server/latest-cves-skeleton"

async function getCVEData() {
    const res = await fetch("https://cve.circl.lu/api/last", {
        next: { revalidate: 60 },
    })
    const data = await res.json()
    return data
}

type CVEs = {
    id: string
    summary: string
    cwe: string
}

export async function LatestCVEs() {
    const data = await getCVEData()
    return (
        <>
            <div className="w-full">
                <h2 className="sm:text-1xl text-2xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl">
                    Newest CVEs
                </h2>
                <div className="not-prose relative mt-5 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/25">
                    <div
                        style={{ backgroundPosition: "10px 10px" }}
                        className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                    ></div>
                    <div className="relative overflow-auto rounded-xl">
                        <div className="my-4 overflow-hidden shadow-sm">
                            <table className="w-full table-auto border-collapse text-sm">
                                <thead>
                                    <tr>
                                        <th className="w-1/6 border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                            ID
                                        </th>
                                        <th className="w-4/5 border-b p-4 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                            Summary
                                        </th>
                                        <th className="w-1/8 border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                            CWE
                                        </th>
                                        <th className="w-1/8 border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"></th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="bg-white dark:bg-slate-800"
                                    key="newest-cve"
                                >
                                    {data.length === 0 && (
                                        <>
                                            {/* @ts-expect-error Server Component */}
                                            <LatestCVEsSkeleton />
                                        </>
                                    )}

                                    {data.map((i: CVEs) => (
                                        <tr key={i}>
                                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                {i.id}
                                            </td>
                                            <td className="border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                {i.summary}
                                            </td>
                                            <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                {i.cwe}
                                            </td>
                                            <td className="border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                <Link
                                                    href={`https://nvd.nist.gov/vuln/detail/${i.id}`}
                                                    target="_blank"
                                                >
                                                    <Icons.link className="h-5 w-5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mb-3 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                            Data provided by cve-search
                        </p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
                </div>
            </div>
        </>
    )
}
