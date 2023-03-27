import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { ScanForm } from "@/components/client/scan"
import { Layout } from "@/components/layout"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

// This is the default metadata for all pages.
export const metadata: Metadata = {
    title: `${siteConfig.name}`,
    description: `${siteConfig.description}`,
}

export default function IndexPage() {
    return (
        <Layout>
            <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
                        Scan and analyze your network{" "}
                        <br className="hidden sm:inline" />
                        for vulnerabilities and misconfigurations.
                    </h1>
                    <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
                        Get started by filling out the form below.
                    </p>
                </div>
                <div className="w-full">
                    <ScanForm />
                </div>
                <Separator />
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
                                            <th className="w-4/6 border-b p-4 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                Description
                                            </th>
                                            <th className="w-1/6 border-b p-4 pr-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                                                Severity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white dark:bg-slate-800"
                                        key="newest-cve"
                                    >
                                        {/* { TODO: Implement newest cves} */}
                                        {Array.from(Array(5).keys()).map(
                                            (i) => (
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
                                                </tr>
                                            )
                                        )}
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
            </section>
        </Layout>
    )
}
