import Link from "next/link"

import { Icons } from "@/components/icons"

async function getCVEData() {
    const res = await fetch("https://cve.circl.lu/api/last", {
        cache: "no-store",
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
                <div className="mt-5  rounded-xl bg-slate-50 pt-0.5 dark:bg-slate-800/25">
                    <div className=" overflow-none my-4 shadow-sm">
                        <table className=" table-auto border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="hidden w-1/6 border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:table-cell">
                                        ID
                                    </th>
                                    <th className="hidden w-4/5 border-b p-4 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:table-cell">
                                        Summary
                                    </th>
                                    <th className="w-1/8 hidden border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:table-cell">
                                        CWE
                                    </th>
                                    <th className="w-1/8 hidden border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:table-cell"></th>
                                    <th className="block border-b p-4 pr-8 font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200 md:hidden">
                                        CVE Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white dark:bg-slate-800"
                                key="newest-cve"
                            >
                                {data.map((i: CVEs) => (
                                    <tr key={i.id}>
                                        <td className="hidden border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:table-cell">
                                            {i.id}
                                        </td>
                                        <td className="text-ellipsis border-b border-slate-100 p-4 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                            <p className="hidden md:block">
                                                {i.summary}
                                            </p>

                                            <div className="block md:hidden">
                                                <div>
                                                    <b>ID:</b> {i.id}{" "}
                                                </div>
                                                <div>
                                                    <b>Summary:</b> {i.summary}
                                                </div>
                                                <div>
                                                    <b>CWE:</b> {i.cwe}
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`https://nvd.nist.gov/vuln/detail/${i.id}`}
                                                        target="_blank"
                                                    >
                                                        <Icons.link className="h-5 w-5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:table-cell">
                                            {i.cwe}
                                        </td>
                                        <td className="hidden border-b border-slate-100 p-4 pr-8 text-slate-500 dark:border-slate-700 dark:text-slate-400 md:table-cell">
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
                    <p className="mb-4 pb-4 text-center text-xs font-semibold text-slate-900 dark:text-slate-400">
                        Data provided by cve-search
                    </p>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
            </div>
        </>
    )
}
